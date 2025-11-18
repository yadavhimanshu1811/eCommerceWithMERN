import { useEffect, useState } from "react";
import "./GetProduct.css";
import { Link } from "react-router-dom";
import { useNotification } from "../../context/NotificationContext";

interface Product {
  name: string;
  category: string;
  company: string;
  price: string;
  _id: string;
}

const GetProduct = () => {
  const {showNotification} = useNotification();
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    //TODO add pagination later
    const API = import.meta.env.VITE_API_URL;
    const response = await fetch(`${API}/getproducts`, {
      headers: {
        authorization: JSON.parse(localStorage.getItem("token") || ""),
      },
    });
    const result = await response.json();
    if ("error" in result) {
      alert(result.error);
    } else {
      console.log("get product", result);
      setProducts(result);
    }
  };

  const deleteProduct = async (id: string) => {
    const API = import.meta.env.VITE_API_URL;
    const response = await fetch(`${API}/deleteproduct/${id}`, {
      method: "delete",
      headers: {
        authorization: JSON.parse(localStorage.getItem("token") || ""),
      },
    });
    const result = await response.json();
    if ("error" in result){
      showNotification(result.error, "error")
    } else {
      showNotification("Product deleted successfully", "success")
      getProducts();
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  let debounceTimer: ReturnType<typeof setTimeout>; //TODO revise

  const handleSearch = (searchString: string) => {
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
        }
      } else {
        getProducts();
      }
    }, 500); // ⏱️ wait 500ms after typing stops
  };

  return (
    <div className="product-container">
      <div className="product-container-div">
        <h1>Products List {`(${products.length} items)`}</h1>
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
          <div className="cell-header">Actions</div>
        </div>

        {products.length ? (
          <div className="product-list">
            {products.map((item: Product, index: number) => {
              return (
                <div className="row" key={item._id}>
                  <div className="cell">{index + 1}</div>
                  <div className="cell">{item.name}</div>
                  <div className="cell">{item.price}</div>
                  <div className="cell">{item.company}</div>
                  <div className="cell">{item.category}</div>
                  <div className="cell">
                    <button
                      className="delete-btn"
                      onClick={() => deleteProduct(item._id)}
                    >
                      Delete
                    </button>
                    <Link to={`/update/${item._id}`}>
                      <button>Update</button>
                    </Link>
                  </div>
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
