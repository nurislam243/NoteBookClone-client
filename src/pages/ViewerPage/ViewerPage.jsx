import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import ChatBox from "../../components/ChatBox/ChatBox";
import PDFViewer from "../../components/PDFViewer/PDFViewer";

const ViewerPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const fileUrl = location.state?.fileUrl;

  useEffect(() => {
    if (!fileUrl) {
      navigate("/");
    }
  }, [fileUrl, navigate]);

  if (!fileUrl) return null;

  return (
    <div className="h-screen w-full grid grid-cols-1 md:grid-cols-2">
      <div className="bg-gray-100 border-r overflow-hidden">
        <ChatBox />
      </div>
      <div className="bg-white overflow-auto">
        <PDFViewer fileUrl={fileUrl} />
      </div>
    </div>
  );
};

export default ViewerPage;
