import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./UpdateProduct.css";
import { useNotification } from "../../context/NotificationContext";

const Updateproduct = () => {
  const {showNotification} = useNotification()

  const [loading, setLoading] = useState(true);
  const [productdetails, setProductDetails] = useState({
    name: "",
    price: "",
    category: "",
    company: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  const getProductDetails = async () => {
    try {
      const API = import.meta.env.VITE_API_URL;
      const response = await fetch(`${API}/getproduct/${id}`, {
        headers: {
          authorization: JSON.parse(localStorage.getItem("token") || ""),
        },
      });
      const result = await response.json();

      if ("error" in result) {
        showNotification(result.error, "error");
      } else {
        setProductDetails(result);
      }
      setLoading(false);
    } catch (err: unknown) {
      if (err instanceof Error) {
        showNotification(err.message, "error");
      } else {
        showNotification("Unexpected Error Occured", "error");
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductDetails();
  }, []);

  const handleUpdateProduct = async () => {
    const { name, price, category, company } = productdetails;
    if (!name || !price || !category || !company) {
      showNotification("Please add correct details", "error");
      return false;
    }
    const API = import.meta.env.VITE_API_URL;
    const response = await fetch(`${API}/updateproduct/${id}`, {
      method: "put",
      body: JSON.stringify(productdetails),
      headers: {
        "Content-Type": "application/json",
        authorization: JSON.parse(localStorage.getItem("token") || ""),
      },
    });
    const result = await response.json();
    if ("error" in result) {
      showNotification(result.error, "error");
    } else {
      showNotification("Product updated successfully !", "success");
      navigate("/");
    }
  };

  const showUpdateForm = () => {
    return (
      <>
        <div className="product-detail">
          <span>Name:</span>
          <input
            placeholder="Enter name"
            value={productdetails.name}
            onChange={(e) => {
              setProductDetails({
                ...productdetails,
                name: e.target.value,
              });
            }}
          />
        </div>
        <div className="product-detail">
          <span>Price:</span>
          <input
            placeholder="Enter price"
            value={productdetails.price}
            onChange={(e) => {
              setProductDetails({
                ...productdetails,
                price: e.target.value,
              });
            }}
          />
        </div>
        <div className="product-detail">
          <span>Category:</span>
          <input
            placeholder="Enter category"
            value={productdetails.category}
            onChange={(e) => {
              setProductDetails({
                ...productdetails,
                category: e.target.value,
              });
            }}
          />
        </div>
        <div className="product-detail">
          <span>Company:</span>
          <input
            placeholder="Enter company"
            value={productdetails.company}
            onChange={(e) => {
              setProductDetails({
                ...productdetails,
                company: e.target.value,
              });
            }}
          />
        </div>
        <button onClick={handleUpdateProduct}>Update</button>
      </>
    );
  };
  return (
    <div className="update-product-container">
      <div className="update-product-div">
        <h1>Update Product</h1>
        {loading ? <div>Loading......</div> : showUpdateForm()}
      </div>
    </div>
  );
};

export default Updateproduct;
