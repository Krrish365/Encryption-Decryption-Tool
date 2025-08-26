import os
from tkinter import *
from functools import partial
from tkinter import filedialog, messagebox
from PyPDF2 import PdfReader, PdfWriter


class PDFApp:
    def __init__(self, root):
        self.window = root
        self.window.geometry("700x420")
        self.window.title('Encrypt & Decrypt PDFs')
        self.window.resizable(width=False, height=False)

        self.frame = Frame(self.window, bg="gray22", width=700, height=420)
        self.frame.place(x=0, y=0)

        self.PDF_path = None
        self.main_window()

    def clear_screen(self):
        for widget in self.frame.winfo_children():
            widget.destroy()

    def main_window(self):
        self.clear_screen()

        Button(self.frame, text='Encrypt', font=("Helvetica", 18, 'bold'),
               bg="red", fg="white", width=7, command=partial(self.select_file, 1)).place(x=280, y=130)

        Button(self.frame, text='Decrypt', font=("Helvetica", 18, 'bold'),
               bg="yellow", fg="black", width=7, command=partial(self.select_file, 2)).place(x=280, y=200)

    def select_file(self, to_call):
        self.PDF_path = filedialog.askopenfilename(
            initialdir="/", title="Select a PDF File",
            filetypes=[("PDF files", "*.pdf*")]
        )
        if self.PDF_path:
            if to_call == 1:
                self.encrypt_password()
            else:
                self.decrypt_password()

    def encrypt_password(self):
        try:
            pdf_reader = PdfReader(self.PDF_path)
            total_pages = len(pdf_reader.pages)

            self.clear_screen()

            Button(self.frame, text="Home", font=("Helvetica", 8, 'bold'),
                   command=self.main_window).place(x=10, y=10)

            Label(self.frame, text="Encrypt PDF", font=("Kokila", 25, "bold"),
                  bg="gray22", fg="yellow").place(x=250, y=15)

            Label(self.frame, text=f"Total Number of Pages: {total_pages}",
                  font=("Times New Roman", 18, 'bold'), bg="gray22", fg="white").place(x=40, y=90)

            Label(self.frame, text=f"File Name: {os.path.basename(self.PDF_path)}",
                  font=("Times New Roman", 18, 'bold'), bg="gray22", fg="white").place(x=40, y=130)

            Label(self.frame, text="Set Password: ",
                  font=("Times New Roman", 18, 'bold'), bg="gray22", fg="white").place(x=40, y=170)

            self.set_password = Entry(self.frame, font=("Helvetica", 12), show='*')
            self.set_password.place(x=190, y=174)

            Button(self.frame, text="Encrypt", font=("Kokila", 10, "bold"),
                   cursor="hand2", command=self.encrypt_pdf).place(x=290, y=220)

        except Exception as e:
            messagebox.showerror("Error", f"Unable to read PDF: {e}")

    def decrypt_password(self):
        self.clear_screen()

        Button(self.frame, text="Home", font=("Helvetica", 8, 'bold'),
               command=self.main_window).place(x=10, y=10)

        Label(self.frame, text="Decrypt PDF", font=("Kokila", 25, "bold"),
              bg="gray22", fg="yellow").place(x=250, y=15)

        Label(self.frame, text="Enter Password: ", font=("Times New Roman", 18, 'bold'),
              bg="gray22", fg="white").place(x=40, y=170)

        self.ent_password = Entry(self.frame, font=("Helvetica", 12), show='*')
        self.ent_password.place(x=220, y=174)

        Button(self.frame, text="Decrypt", font=("Kokila", 10, "bold"),
               cursor="hand2", command=self.decrypt_pdf).place(x=290, y=220)

    def encrypt_pdf(self):
        if not self.set_password.get():
            messagebox.showwarning('Warning', "Please set the password")
            return

        try:
            reader = PdfReader(self.PDF_path)
            writer = PdfWriter()

            for page in reader.pages:
                writer.add_page(page)

            writer.encrypt(user_password=self.set_password.get())

            with open(self.PDF_path, 'wb') as f:
                writer.write(f)

            messagebox.showinfo("Success", "PDF encrypted successfully.")
            self.main_window()
            self.PDF_path = None

        except Exception as e:
            messagebox.showerror("Error", f"Encryption failed: {e}")

    def decrypt_pdf(self):
        if not self.ent_password.get():
            messagebox.showwarning('Warning', "Please enter the password")
            return

        try:
            reader = PdfReader(self.PDF_path)

            if reader.is_encrypted:
                try:
                    reader.decrypt(self.ent_password.get())
                except Exception:
                    messagebox.showerror("Error", "Incorrect password.")
                    return

            writer = PdfWriter()
            for page in reader.pages:
                writer.add_page(page)

            output_file_path = filedialog.asksaveasfilename(
                defaultextension=".pdf", filetypes=[("PDF files", "*.pdf")]
            )

            if output_file_path:
                with open(output_file_path, 'wb') as f:
                    writer.write(f)

                messagebox.showinfo("Success", "PDF decrypted and saved successfully.")
                self.main_window()
                self.PDF_path = None

        except Exception as e:
            messagebox.showerror("Error", f"Decryption failed: {e}")


if __name__ == "__main__":
    root = Tk()
    app = PDFApp(root)
    root.mainloop()
