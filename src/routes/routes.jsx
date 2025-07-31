import { createBrowserRouter } from "react-router";
import App from "../App";
import UploadPage from "../pages/UploadPage/UploadPage";
import ViewerPage from "../pages/ViewerPage/ViewerPage";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: '/',
        Component: UploadPage
      },
      {
        path: '/viewer',
        Component: ViewerPage
      }
    ]
  }
]);