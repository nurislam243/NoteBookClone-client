# 📝 Google NotebookLM Clone – PDF Chat Assistant

A full-stack web application built using **React (Frontend)** and **Node.js/Express (Backend)** that allows users to upload PDFs, view them, and chat with the contents. The chat provides smart answers with **page-level citations**, allowing the user to jump to relevant parts of the document directly.

---

## 🚀 Features

### ✅ PDF Upload & Viewing
- Upload large PDF files.
- View the uploaded PDF inside a built-in PDF viewer with page navigation.

### 💬 Chat Interface
- Ask questions related to the content of the uploaded PDF.
- Answers are generated using Cohere AI and optimized for minimal token usage.

### 🔍 Citation & Page Navigation
- Each answer includes **citation buttons** showing relevant page numbers.
- Clicking a citation scrolls the viewer to the referenced page.

---

## 🧠 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS + DaisyUI
- React-PDF
- Axios

### Backend
- Node.js
- Express.js
- Multer (for PDF upload)
- pdf-parse (for PDF to text conversion)
- Cohere AI (for embedding + generation)

---

