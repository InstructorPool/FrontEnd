import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./pages/MainPage";
import RootLayout from "./layout/RootLayout";
import NotFoundPage from "./pages/NotFoundPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <Main />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;