import { useEffect, useState } from "react";
import "./GetProduct.css";
import { Link } from "react-router-dom";
import { useNotification } from "../../context/NotificationContext";
import Loader from "../Loader/Loader";

interface Product {
  name: string;
  category: string;
  company: string;
  price: string;
  contact: string;
  userEmail: string;
  _id: string;
}

const GetProduct = () => {
  const { showNotification } = useNotification();
  const [products, setProducts] = useState([]);
  const [loading, setloading] = useState(true);
  const userEmail = JSON.parse(localStorage.getItem("user") ?? "{}")?.email;

  const getProducts = async () => {
    //TODO add pagination later
    const API = import.meta.env.VITE_API_URL;
    const response = await fetch(`${API}/getproducts`, {
      headers: {
        authorization: JSON.parse(localStorage.getItem("token") || ""),
      },
    });
    const result = await response.json();
    console.log("result", result)
    setloading(false);
    if ("error" in result) {
      showNotification(result.error, "error")
    } else {
      console.log("get product", result);
      setProducts(result);
    }
  };

  const deleteProduct = async (id: string) => {
    setloading(true);
    const API = import.meta.env.VITE_API_URL;
    const response = await fetch(`${API}/deleteproduct/${id}`, {
      method: "delete",
      headers: {
        authorization: JSON.parse(localStorage.getItem("token") || ""),
      },
    });
    const result = await response.json();
    if ("error" in result) {
      showNotification(result.error, "error");
      setloading(false);
    } else {
      getProducts();
      showNotification("Product deleted successfully", "success");
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  let debounceTimer: ReturnType<typeof setTimeout>; //TODO revise

  const handleSearch = (searchString: string) => {
    setloading(true);
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(async () => {
      if (searchString.trim()) {
        const API = import.meta.env.VITE_API_URL;
        const response = await fetch(`${API}/search/${searchString}`, {
          headers: {
            authorization: JSON.parse(localStorage.getItem("token") || ""),
          },
        });
        const result = await response.json();
        if (result) {
          setProducts(result);
          setloading(false);
        }
      } else {
        getProducts();
      }
    }, 500); // ⏱️ wait 500ms after typing stops
  };

  return (
    <div className="product-container">
      <div className="product-container-div">
        <h1>Products List {loading ? "" : `(${products.length} items)`}</h1>
        <input
          placeholder="Search product"
          onChange={(e) => handleSearch(e.target.value)}
          // TODO useRef
        />

        <div className="row">
          <div className="cell-header">S.no</div>
          <div className="cell-header">name</div>
          <div className="cell-header">price</div>
          <div className="cell-header">company</div>
          <div className="cell-header">category</div>
          <div className="cell-header">contact</div>
          <div className="cell-header">Actions</div>
        </div>

        {loading ? (
          <div className="loader-parent">
            <Loader />
          </div>
        ) : products.length ? (
          <div className="product-list">
            {products.map((item: Product, index: number) => {
              return (
                <div className="row" key={item._id}>
                  <div className="cell">{index + 1}</div>
                  <div className="cell">{item.name}</div>
                  <div className="cell">{item.price}</div>
                  <div className="cell">{item.company}</div>
                  <div className="cell">{item.category}</div>
                  <div className="cell">{item.contact}</div>
                  {item.userEmail === userEmail ? <div className="cell">
                    <button
                      className="delete-btn"
                      onClick={() => deleteProduct(item._id)}
                    >
                      Delete
                    </button>
                    <Link to={`/update/${item._id}`}>
                      <button>Update</button>
                    </Link>
                  </div> : null}
                </div>
              );
            })}
          </div>
        ) : (
          <h1>No products found</h1>
        )}
      </div>
    </div>
  );
};

export default GetProduct;
