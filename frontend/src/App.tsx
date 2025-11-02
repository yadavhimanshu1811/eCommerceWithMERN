import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Signup from "./Components/SignUp/Signup";
import PrivateComponent from "./Components/PrivateComponent";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/signup",
      element: (
        <>
          <Signup />
        </>
      ),
    },
    {
      element: <PrivateComponent />,
      children: [
        {
          path: "",
          element: (
            <>
              <Navbar />
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
        // {
        //   path: "/logout",
        //   element: (
        //     <>
        //       <Navbar />
        //     </>
        //   ),
        // },
        {
          path: "/profile ",
          element: (
            <div>
              <Navbar />
            </div>
          ),
        },
      ],
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
