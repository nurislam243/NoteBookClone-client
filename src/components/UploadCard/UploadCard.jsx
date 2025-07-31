import { FiUpload } from "react-icons/fi";
import Swal from "sweetalert2";
import { useState } from "react";

export default function UploadCard({ onFileUpload }) {
  const [isDragging, setIsDragging] = useState(false);
  

  const handleFile = (file) => {
    if (file && file.type === "application/pdf") {
      onFileUpload(file);
    } else {
      Swal.fire({
        icon: "error",
        title: "Invalid File",
        text: "Please upload a valid PDF file.",
        confirmButtonColor: "#7e22ce"
      });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <label
        htmlFor="file-upload"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`cursor-pointer py-11 px-12 ${
          isDragging ? "bg-primary/30 border-2 border-primary/70" : "bg-base-100/60"
        } shadow-lg rounded-lg flex flex-col items-center justify-center text-center hover:shadow-xl transition duration-300`}
      >
        <div className="text-primary bg-primary/10 p-4 shadow-primary hover:bg-primary/20 hover:shadow-md rounded-full text-4xl mb-4">
          <FiUpload />
        </div>
        <p className="font-semibold text-white text-xl mb-2 mt-3">Upload PDF to start chatting</p>
        <p className="text-base text-white/60">
          Click or drag and drop your file here
        </p>
        <input
          id="file-upload"
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
}
