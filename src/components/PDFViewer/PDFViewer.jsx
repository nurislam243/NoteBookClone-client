import React, { useEffect, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const PDFViewer = ({ fileUrl, scrollToPageNumber }) => {
  const [numPages, setNumPages] = useState(null);
  const [error, setError] = useState(null);
  const pageRefs = useRef({});

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  useEffect(() => {
    if (scrollToPageNumber && pageRefs.current[scrollToPageNumber]) {
      pageRefs.current[scrollToPageNumber].scrollIntoView({ behavior: 'smooth' });
    }
  }, [scrollToPageNumber]);

  return (
    <div className="flex flex-col items-center justify-center h-full p-1.5 bg-primary/50">
      {error ? (
        <div className="text-red-500 font-semibold">Failed to load PDF: {error.message}</div>
      ) : (
        <div className="shadow-md border rounded-md overflow-auto h-[100vh] w-full max-w-4xl">
          <Document
            file={fileUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={(err) => setError(err)}
            loading={<p className="text-gray-500 p-4">Loading PDF...</p>}
          >
            {Array.from(new Array(numPages), (el, index) => {
              const pageNumber = index + 1;
              if (!pageRefs.current[pageNumber]) {
                pageRefs.current[pageNumber] = React.createRef();
              }

              return (
                <div
                  key={`page_${pageNumber}`}
                  ref={(el) => (pageRefs.current[pageNumber] = el)}
                  className="mb-10 pb-6 border-b border-gray-300 flex flex-col items-center bg-gray-50 shadow-md rounded-md"
                >
                  <Page pageNumber={pageNumber} width={700} />
                  <p className="text-sm text-gray-500 mt-2">Page {pageNumber}</p>
                </div>
              );
            })}
          </Document>
        </div>
      )}
    </div>
  );
};

export default PDFViewer;
