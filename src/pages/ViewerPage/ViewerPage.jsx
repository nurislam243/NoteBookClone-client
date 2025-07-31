import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import ChatBox from "../../components/ChatBox/ChatBox";
import PDFViewer from "../../components/PDFViewer/PDFViewer";

const ViewerPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const fileUrl = location.state?.fileUrl;
  const [scrollToPage, setScrollToPage] = useState(null);

  const handleCitationClick = (pageNumber) => {
    setScrollToPage(pageNumber);
  };

  useEffect(() => {
    if (!fileUrl) {
      navigate("/");
    }
  }, [fileUrl, navigate]);

  if (!fileUrl) return null;

  return (
    <div className="h-screen w-full grid grid-cols-1 md:grid-cols-2">
      <div className="bg-base-300 border-r overflow-hidden">
        <ChatBox fileUrl={fileUrl} onCitationClick={handleCitationClick} />
      </div>
      <div className="bg-base-100 overflow-auto">
        <PDFViewer fileUrl={fileUrl} scrollToPageNumber={scrollToPage} />
      </div>
    </div>
  );
};

export default ViewerPage;
