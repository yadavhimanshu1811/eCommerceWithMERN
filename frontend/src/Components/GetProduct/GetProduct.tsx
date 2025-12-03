import { useEffect, useState, useRef } from "react";
import "./GetProduct.css";
import { Link } from "react-router-dom";
import { useNotification } from "../../context/NotificationContext";
import Loader from "../Loader/Loader";
import noImage from "../../assets/noImage.svg";

export interface User {
  _id: string;
  name: string;
  email: string;
}

interface Product {
  name: string;
  category: string;
  company: string;
  price: string;
  contact: string;
  _id: string;
  user: User;
  image: string;
}

const GetProduct = () => {
  const { showNotification } = useNotification();
  const [products, setProducts] = useState([] as any[]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [page, setpage] = useState(1);
  const limit = 5;
  const [loading, setloading] = useState(true);
  const [isSearch, setIsSearch] = useState(false);
  const currentUserId = JSON.parse(localStorage.getItem("user") ?? "{}")?._id;

  const getProducts = async (afterSearch?: Boolean) => {
    const API = import.meta.env.VITE_API_URL;
    const response = await fetch(
      `${API}/getproducts?page=${afterSearch ? 1 : page}&limit=${limit}`,
      {
        headers: {
          authorization: JSON.parse(localStorage.getItem("token") || ""),
        },
      }
    );
    const result = await response.json();
    console.log("get product result", result);
    setloading(false);
    if ("error" in result) {
      showNotification(result.error, "error");
    } else {
      setProducts((prev) => [...prev, ...result.data]);
      setTotalProducts(result.meta.totalItems);
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
      setpage(1);
      setProducts([]);
      getProducts(true);
      showNotification("Product deleted successfully", "success");
    }
  };

  const isFirstCall = useRef(true);
  useEffect(() => {
    if (isFirstCall.current) {
      isFirstCall.current = false;
    } else if (page === 1) {
      return; // Prevent double page=1 load
    }

    getProducts();
  }, [page]);

  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSearch = (searchString: string) => {
    setIsSearch(true);
    setloading(true);
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(async () => {
      if (searchString.trim()) {
        const API = import.meta.env.VITE_API_URL;
        const response = await fetch(`${API}/search/${searchString}`, {
          headers: {
            authorization: JSON.parse(localStorage.getItem("token") || ""),
          },
        });
        const result = await response.json();
        console.log("search result", result);
        if (result) {
          setProducts(result);
        }
        setloading(false);
      } else {
        // if empty → reset pagination
        setProducts([]);
        setpage(1);
        setloading(true);
        getProducts(true);
        setIsSearch(false);
      }
    }, 500); // Recommended: 300-500ms debounce
  };

  // const handleLoadMore = () => {
  //   setpage((prev) => prev + 1);
  // };

  const listRef = useRef(null);
  const loaderRef = useRef(null);

  useEffect(() => {
    if (loading) return; // wait until products are rendered
    if (!loaderRef.current) return;
    if (!listRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          console.log("REACHED BOTTOM");
          setpage((prev) => prev + 1);
        }
      },
      {
        root: listRef.current,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [loading, products.length]);

  return (
    <div className="product-container">
      <div className="product-container-div">
        <h1>
          Products List{" "}
          {loading
            ? ""
            : `(${isSearch ? products.length : totalProducts} items)`}
        </h1>
        <input
          placeholder="Search product"
          onChange={(e) => handleSearch(e.target.value)}
          // TODO useRef
        />

        <div className="row">
          <div className="cell-header">S.no</div>
          <div className="cell-header">Name</div>
          <div className="cell-header">Price</div>
          <div className="cell-header">Company</div>
          <div className="cell-header">Category</div>
          <div className="cell-header">Contact</div>
          <div className="cell-header">Image</div>
          <div className="cell-header">Actions</div>
        </div>

        {loading ? (
          <div className="loader-parent">
            <Loader />
          </div>
        ) : products.length ? (
          <div className="product-list" ref={listRef}>
            {products.map((item: Product, index: number) => {
              return (
                <div className="row" key={item._id}>
                  <div className="cell">{index + 1}</div>
                  <div className="cell">{item.name}</div>
                  <div className="cell">{item.price}</div>
                  <div className="cell">{item.company}</div>
                  <div className="cell">{item.category}</div>
                  <div className="cell">{item.contact}</div>
                  <img src={item.image || noImage} alt="product" height="80" />
                  {item.user._id === currentUserId ? (
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
                  ) : (
                    <div className="cell tooltip-wrapper">
                      <button className="disabled-btn" disabled>
                        Delete
                      </button>
                      <span className="tooltip-text">
                        Only the user who added this product can edit or delete
                        it.
                      </span>
                      <button className="disabled-btn" disabled>
                        Update
                      </button>
                      <span className="tooltip-text">
                        Only the user who added this product can edit or delete
                        it.
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
            {/* {products.length < totalProducts && !isSearch ? (
              <div className="load-more">
                <button onClick={handleLoadMore}>Load more</button>
              </div>
            ) : null} */}
            {products.length < totalProducts && !isSearch ? (
              <div
                ref={loaderRef}
                style={{ height: 20 }}
              ><Loader size="sm"/></div>
            ) : null}
          </div>
        ) : (
          <h1>No products found</h1>
        )}
      </div>
    </div>
  );
};

export default GetProduct;
