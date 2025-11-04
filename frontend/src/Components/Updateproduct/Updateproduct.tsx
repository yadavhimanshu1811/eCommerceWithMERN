import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./UpdateProduct.css";

const Updateproduct = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
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
      const response = await fetch(`http://localhost:3000/getproduct/${id}`,{
        headers:{
          authorization: JSON.parse(localStorage.getItem("token") || "")
        }
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch product");
      }
      console.log("result", data);

      setProductDetails(data);
      setLoading(false);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message);
        setError(err.message);
      } else {
        console.error("Unexpected error", err);
        setError("Something went wrong");
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductDetails();
  }, []);

  const handleUpdateProduct = async () => {
    const response = await fetch(`http://localhost:3000/updateproduct/${id}`, {
      method: "put",
      body: JSON.stringify(productdetails),
      headers: {
        "Content-Type": "application/json",
        authorization: JSON.parse(localStorage.getItem("token") || "")
      },
    });
    const result = await response.json();
    console.log("product updated", result);
    navigate("/");
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
        {error ? <div>{error}</div> : null}
        {loading ? <div>Loading......</div> : showUpdateForm()}
      </div>
    </div>
  );
};

export default Updateproduct;
