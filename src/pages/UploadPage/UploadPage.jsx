import React, { useState } from 'react';
import UploadCard from '../../components/UploadCard/UploadCard';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router';

const UploadPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileUpload = async (file) => {
    if (!file) {
      Swal.fire({
        icon: 'warning',
        title: 'No File Selected',
        text: 'Please select a PDF file first.',
      });
      return;
    }

    const formData = new FormData();
    formData.append('pdf', file);

    try {
      setLoading(true);

      await axios.post('http://localhost:5000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      const fileUrl = URL.createObjectURL(file);
      navigate('/viewer', { state: { fileUrl } });

    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Upload Failed',
        text: 'Something went wrong. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-base-300 bg-radial-[at_50%_75%] from-primary/25 via-primary/30 to-secondary/30 to-90%">
      {loading ? (
        <div className="text-center">
          <div className="loader mb-4"></div>
          <p className="text-white font-medium text-lg">Uploading your PDF...</p>
        </div>
      ) : (
        <UploadCard onFileUpload={handleFileUpload} />
      )}
    </div>
  );
};

export default UploadPage;
