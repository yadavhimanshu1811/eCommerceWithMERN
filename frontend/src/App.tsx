import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Signup from "./Components/SignUp/Signup";
import PrivateComponent from "./Components/PrivateComponent";
import Login from "./Components/Login/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddProduct from "./Components/AddProduct/AddProduct";

function App() {
  const router = createBrowserRouter([
    {
      path: "/signup",
      element: (
        <>
          <Navbar />
          <Signup />
        </>
      ),
    },
    {
      path: "/login",
      element: (
        <>
          <Navbar />
          <Login />
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
              <AddProduct/>
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
