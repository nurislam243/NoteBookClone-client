import { FiUpload } from "react-icons/fi";

export default function UploadCard({ onFileUpload }) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      onFileUpload(file);
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <label
        htmlFor="file-upload"
        className="cursor-pointer py-11 px-12 hover:shadow-purple-200 bg-white shadow-lg rounded-lg flex flex-col items-center justify-center text-center hover:shadow-xl transition duration-300"
      >
        <div className="text-purple-500 bg-purple-50 p-4 shadow-purple-50 hover:bg-purple-100 hover:shadow-md rounded-full text-4xl mb-4">
          <FiUpload></FiUpload>
        </div>
        <p className="font-semibold text-black/80 text-xl mb-2 mt-3">Upload PDF to start chatting</p>
        <p className="text-base text-gray-500">Click or drag and drop your file here</p>
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
