

# Google NotebookLM Clone - Frontend

A React-based frontend application for uploading PDF files, chatting about their content, and viewing PDF pages with citation navigation.

---

## 🌐 Live Site

You can access the live frontend application here:  
https://google-notebook-lm-clone.netlify.app/


----------

## 🛠️ Project Setup

### Prerequisites

- Node.js (v14+ recommended)
- npm or yarn package manager
- Backend server running (see backend README for details)

### Installation

1. Clone or extract the frontend source code.

2. Navigate to the frontend folder:

```bash
cd frontend
```
3.  Install dependencies:
    

```bash

`npm install # or yarn install` 
```
----------

## 🚀 Running the Application

Start the React development server:

```bash

`npm run dev` 
```

The app will run at [http://localhost:5173](http://localhost:5173) by default.

> ⚠️ Make sure your backend server is running at `http://localhost:5000` or update API URLs in the code accordingly.

----------


## 📋 Features

-   **PDF Upload**: Drag and drop or click to select a PDF file. Only PDFs are accepted.
    
-   **PDF Viewing**: Render uploaded PDF pages with smooth scrolling.
    
-   **Chat Interface**: Ask questions related to the uploaded PDF content.
    
-   **Citation Buttons**: Responses contain clickable buttons referencing specific PDF pages that scroll the viewer accordingly.
    
-   **User-friendly UI**: Clean, responsive UI using Tailwind CSS and react-icons.
    
-   **Error Handling**: Alerts and messages for invalid files, upload failures, and empty inputs.
    
-   **Smooth Navigation**: Automatically scroll to PDF page when citation is clicked in chat.
    

----------

## ⚙️ Environment Variables

No environment variables are needed for the frontend by default.

> **Note**: If your backend URL differs from `http://localhost:5000`, update the axios requests in `/src/pages/UploadPage` and `/src/components/ChatBox` accordingly.

----------


## 🔧 Important Dependencies

-   `react-router` - For routing and nested routes.
    
-   `axios` - For API requests to backend.
    
-   `sweetalert2` & `sweetalert2-react-content` - For alerts and modals.
    
-   `react-pdf` - PDF rendering.
    
-   `react-icons` - Icon components.
    
-   `tailwindcss` (assumed) - Utility-first CSS framework for styling.
    

----------

## 📝 Usage Notes

-   The app expects a running backend server with the `/upload` and `/api/chat` endpoints.
    
-   PDF files are uploaded and processed by the backend, embeddings generated, and stored in-memory.
    
-   User questions are sent to the backend, which returns answers and page references.
    
-   The frontend scrolls the PDF viewer to the referenced page on citation click.