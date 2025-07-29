import React, { useState } from 'react';
import UploadCard from '../../components/UploadCard/UploadCard';

const UploadPage = () => {
    const [uploadedFile, setUploadedFile] = useState(null);

    const handleFileUpload = (file) => {
        setUploadedFile(file);
        console.log("Uploaded File:", file);
    };

    return (
        <div>
            <UploadCard onFileUpload={handleFileUpload} ></UploadCard>
        </div>
    );
};

export default UploadPage;