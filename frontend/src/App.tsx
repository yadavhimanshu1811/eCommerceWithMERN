import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Signup from "./Components/SignUp/Signup";
import PrivateComponent from "./Components/PrivateComponent";
import Login from "./Components/Login/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddProduct from "./Components/AddProduct/AddProduct";
import GetProduct from "./Components/GetProduct/GetProduct";
import Updateproduct from "./Components/Updateproduct/Updateproduct";
import Profile from "./Components/Profile/Profile";

function App() {
  const router = createBrowserRouter([
    {
      path: "/signup",
      element: (
        <>
          <Navbar />
          <div className="content">
            <Signup />
          </div>
        </>
      ),
    },
    {
      path: "/login",
      element: (
        <>
          <Navbar />
          <div className="content">
            <Login />
          </div>
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
              <div className="content">
                <GetProduct />
              </div>
            </>
          ),
        },
        {
          path: "/add",
          element: (
            <>
              <Navbar />
              <div className="content">
                <AddProduct />
              </div>
            </>
          ),
        },
        {
          path: "/update/:id",
          element: (
            <>
              <Navbar />
              <div className="content">
                <Updateproduct />
              </div>
            </>
          ),
        },
        {
          path: "/profile",
          element: (
            <>
              <Navbar />
              <div className="content">
                <Profile />
              </div>
            </>
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
