// Utility: Show Bootstrap alerts
function showAlert(message, type = "danger") {
  const alertBox = document.getElementById("alertBox");
  alertBox.innerHTML = `
    <div class="alert alert-${type} alert-dismissible fade show" role="alert">
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>`;
}

// Utility: SHA-256 hashing
async function sha256(data) {
  const buffer = await crypto.subtle.digest("SHA-256", data);
  return btoa(String.fromCharCode(...new Uint8Array(buffer)));
}

// Utility: String ↔ ArrayBuffer
function strToBuf(str) {
  return new TextEncoder().encode(str);
}
function bufToStr(buf) {
  return new TextDecoder().decode(buf);
}

// Generate random AES key
async function generateKey() {
  const algo = document.getElementById("algorithm").value;
  let key;
  if (algo.startsWith("AES")) {
    key = await crypto.subtle.generateKey({ name: algo, length: 256 }, true, ["encrypt", "decrypt"]);
  } else if (algo === "TripleDES") {
    key = await crypto.subtle.generateKey({ name: "DES-EDE3-CBC", length: 192 }, true, ["encrypt", "decrypt"]);
  }
  const rawKey = await crypto.subtle.exportKey("raw", key);
  document.getElementById("keyInput").value = btoa(String.fromCharCode(...new Uint8Array(rawKey)));
  showAlert("Key generated successfully!", "success");
}

// Encrypt data with hash
async function encryptData() {
  const algo = document.getElementById("algorithm").value;
  const keyB64 = document.getElementById("keyInput").value.trim();
  const text = document.getElementById("textInput").value.trim();
  const file = document.getElementById("fileInput").files[0];

  if (!keyB64) return showAlert("Please provide a key!");
  if (!text && !file) return showAlert("Please provide text or file to encrypt!");

  let data;
  if (file) {
    data = await file.arrayBuffer();
  } else {
    data = strToBuf(text);
  }

  const originalHash = await sha256(data);
  document.getElementById("originalHash").textContent = originalHash;

  const iv = crypto.getRandomValues(new Uint8Array(16));
  let key;
  try {
    key = await crypto.subtle.importKey("raw", Uint8Array.from(atob(keyB64), c => c.charCodeAt(0)), { name: algo }, false, ["encrypt"]);
  } catch (err) {
    return showAlert("Invalid key format!");
  }

  let ciphertext;
  try {
    ciphertext = await crypto.subtle.encrypt({ name: algo, iv }, key, data);
  } catch (err) {
    return showAlert("Encryption failed: " + err.message);
  }

  const result = {
    algo,
    iv: btoa(String.fromCharCode(...iv)),
    ciphertext: btoa(String.fromCharCode(...new Uint8Array(ciphertext))),
    hash: originalHash
  };

  document.getElementById("resultOutput").value = JSON.stringify(result, null, 2);
  showAlert("Encryption successful!", "success");
}

// Decrypt data with hash verification
async function decryptData() {
  const keyB64 = document.getElementById("keyInput").value.trim();
  const result = document.getElementById("resultOutput").value.trim();
  if (!keyB64) return showAlert("Please provide a key!");
  if (!result) return showAlert("No encrypted data to decrypt!");

  let parsed;
  try {
    parsed = JSON.parse(result);
  } catch (err) {
    return showAlert("Invalid encrypted data format!");
  }

  let key;
  try {
    key = await crypto.subtle.importKey("raw", Uint8Array.from(atob(keyB64), c => c.charCodeAt(0)), { name: parsed.algo }, false, ["decrypt"]);
  } catch (err) {
    return showAlert("Invalid key format!");
  }

  try {
    const iv = Uint8Array.from(atob(parsed.iv), c => c.charCodeAt(0));
    const ciphertext = Uint8Array.from(atob(parsed.ciphertext), c => c.charCodeAt(0));

    const decrypted = await crypto.subtle.decrypt({ name: parsed.algo, iv }, key, ciphertext);
    const decryptedStr = bufToStr(decrypted);

    const decryptedHash = await sha256(decrypted);
    document.getElementById("decryptedHash").textContent = decryptedHash;

    if (decryptedHash === parsed.hash) {
      document.getElementById("verificationStatus").textContent = "✅ Integrity Verified";
      showAlert("Decryption successful & integrity verified!", "success");
    } else {
      document.getElementById("verificationStatus").textContent = "❌ Integrity Failed";
      showAlert("Decryption completed but hash mismatch! Data may be corrupted.", "warning");
    }

    document.getElementById("textInput").value = decryptedStr;
  } catch (err) {
    return showAlert("Decryption failed: " + err.message);
  }
}
