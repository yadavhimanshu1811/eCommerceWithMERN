import { useState } from "react";
import "./Addproduct.css";

export const AddProduct = () => {
  const [productDetails, setProductDetails] = useState({
    name: "",
    price: "",
    category: "",
    company: "",
  });

  const handleAddProduct = async () => {
    const { name, price, category, company } = productDetails;
    if (!name || !price || !category || !company) {
      alert("Please add correct details");
    } else {
      const userID = JSON.parse(localStorage.getItem("user") ?? "{}")?._id;
      const response = await fetch("http://localhost:3000/addproduct", {
        method: "post",
        body: JSON.stringify({ ...productDetails, userID }),
        headers: {
          "Content-Type": "application/json",
          "authorization": JSON.parse(localStorage.getItem("token") || "")
        },
      });
      const result = await response.json();
      if (result) {
        setProductDetails({
          name: "",
          price: "",
          category: "",
          company: "",
        });
      }
    }
  };

  return (
    <div className="add-product-container">
      <div className="add-product-div">
        <h1>Add Product</h1>
        <input
          className="input-box"
          placeholder="Enter Name"
          value={productDetails.name}
          onChange={(e) => {
            setProductDetails({
              ...productDetails,
              name: e.target.value,
            });
          }}
        />
        <input
          className="input-box"
          placeholder="Enter price"
          value={productDetails.price}
          onChange={(e) => {
            setProductDetails({
              ...productDetails,
              price: e.target.value,
            });
          }}
        />
        <input
          className="input-box"
          placeholder="Enter category"
          value={productDetails.category}
          onChange={(e) => {
            setProductDetails({
              ...productDetails,
              category: e.target.value,
            });
          }}
        />
        <input
          className="input-box"
          placeholder="Enter company"
          value={productDetails.company}
          onChange={(e) => {
            setProductDetails({
              ...productDetails,
              company: e.target.value,
            });
          }}
        />
        <button onClick={handleAddProduct}>Add Product</button>
      </div>
    </div>
  );
};

export default AddProduct;
