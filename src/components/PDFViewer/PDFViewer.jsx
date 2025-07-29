import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// import file from '../../assets/Main-Routine-Oct-2023.pdf'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const PDFViewer = ({ fileUrl }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [error, setError] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const goToPrevPage = () => setPageNumber(prev => Math.max(prev - 1, 1));
  const goToNextPage = () => setPageNumber(prev => Math.min(prev + 1, numPages));

  return (
    <div className="flex flex-col items-center justify-center h-full px-4 py-6 bg-white">
      {error ? (
        <div className="text-red-500 font-semibold">Failed to load PDF: {error.message}</div>
      ) : (
        <>
          <div className="shadow-md border rounded-md overflow-auto h-[90vh]">
            <Document
              file={fileUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={(err) => setError(err)}
              loading={<p className="text-gray-500 p-4">Loading PDF...</p>}
            >
              <Page pageNumber={pageNumber} width={700} height={900} />
            </Document>
          </div>

          <div className="mt-4 flex items-center space-x-4">
            <button
              onClick={goToPrevPage}
              disabled={pageNumber <= 1}
              className="bg-purple-500 text-white px-4 py-2 rounded disabled:opacity-40"
            >
              Previous
            </button>
            <p className="text-gray-700 font-medium">
              Page {pageNumber} of {numPages || '?'}
            </p>
            <button
              onClick={goToNextPage}
              disabled={pageNumber >= numPages}
              className="bg-purple-500 text-white px-4 py-2 rounded disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PDFViewer;
