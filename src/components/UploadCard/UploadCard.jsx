import { FiUpload } from "react-icons/fi";
import Swal from "sweetalert2";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function UploadCard({ onFileUpload }) {
  const [isDragging, setIsDragging] = useState(false);
  const navigate = useNavigate();

  const handleFile = (file) => {
    if (file && file.type === "application/pdf") {
      const fileUrl = URL.createObjectURL(file);
      onFileUpload(file);
      navigate("/viewer", { state: { fileUrl } });
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
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <label
        htmlFor="file-upload"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`cursor-pointer py-11 px-12 ${
          isDragging ? "bg-purple-50 border-2 border-purple-400" : "bg-white"
        } shadow-lg rounded-lg flex flex-col items-center justify-center text-center hover:shadow-xl transition duration-300`}
      >
        <div className="text-purple-500 bg-purple-50 p-4 shadow-purple-50 hover:bg-purple-100 hover:shadow-md rounded-full text-4xl mb-4">
          <FiUpload />
        </div>
        <p className="font-semibold text-black/80 text-xl mb-2 mt-3">Upload PDF to start chatting</p>
        <p className="text-base text-gray-500">
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
