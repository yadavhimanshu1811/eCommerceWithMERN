import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Signup from "./Components/SignUp/Signup";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: (
        <>
          <Navbar />
        </>
      ),
    },
    {
      path: "/signup",
      element: (
        <>
          <Signup />
        </>
      ),
    },
    {
      path: "/add",
      element: (
        <>
          <Navbar />
        </>
      ),
    },
    {
      path: "/update",
      element: (
        <>
          <Navbar />
        </>
      ),
    },
    {
      path: "/logout",
      element: (
        <>
          <Navbar />
        </>
      ),
    },
    {
      path: "/profile ",
      element: (
        <div>
          <Navbar />
        </div>
      ),
    },
  ]);

  return (
    <div className="app-container">
      <RouterProvider router={router} />
      <Footer />
    </div>
  );
}

export default App;
