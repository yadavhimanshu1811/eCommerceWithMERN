import { useState, useRef, useEffect } from "react";
import "./Addproduct.css";
import Notification from "../Notification";

interface ProductDetails {
  name: string;
  price: string;
  category: string;
  company: string;
}

type NotifType = "success" | "error" | "info";

export const AddProduct = () => {
  const [productDetails, setProductDetails] = useState<ProductDetails>({
    name: "",
    price: "",
    category: "",
    company: "",
  });

  const [notif, setNotif] = useState<{
    message: string;
    type: NotifType;
  } | null>(null);

  const nameRef = useRef<HTMLInputElement | null>(null);
  const priceRef = useRef<HTMLInputElement | null>(null);
  const companyRef = useRef<HTMLInputElement | null>(null);
  const categoryRef = useRef<HTMLInputElement | null>(null);
  const submitRef = useRef<HTMLButtonElement | null>(null);

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    nextRef?: React.RefObject<HTMLInputElement | HTMLButtonElement | null>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      nextRef?.current?.focus();
    }
  };

  useEffect(() => {
    nameRef.current?.focus();
  }, []);

  const handleAddProduct = async () => {
    const { name, price, category, company } = productDetails;

    if (!name || !price || !category || !company) {
      setNotif({ message: "Please add correct details", type: "error" });
      nameRef.current?.focus();
      return;
    }

    const userID = JSON.parse(localStorage.getItem("user") ?? "{}")?._id;
    const API = import.meta.env.VITE_API_URL;
    try {
      const response = await fetch(`${API}/addproduct`, {
        method: "post",
        body: JSON.stringify({ ...productDetails, userID }),
        headers: {
          "Content-Type": "application/json",
          authorization: JSON.parse(localStorage.getItem("token") || ""),
        },
      });
      const result = await response.json();
      if ("error" in result) {
        setNotif({ message: result.error, type: "error" });
      } else {
        setNotif({
          message: "Product added successfully!",
          type: "success",
        });

        setProductDetails({
          name: "",
          price: "",
          category: "",
          company: "",
        });

        nameRef.current?.focus();
      }
    } catch (err) {
      setNotif({
        message: "Something went wrong!",
        type: "error",
      });
    }
  };

  return (
    <>
      <div className="add-product-container">
        <div className="inner-div">
          {notif && (
            <Notification
              message={notif.message}
              type={notif.type}
              duration={2500}
              onClose={() => setNotif(null)}
            />
          )}

          <div className="add-product-div">
            <h1>Add Product</h1>

            <input
              className="input-box"
              placeholder="Enter Name"
              value={productDetails.name}
              ref={nameRef}
              onKeyDown={(e) => handleKeyDown(e, priceRef)}
              onChange={(e) =>
                setProductDetails({
                  ...productDetails,
                  name: e.target.value,
                })
              }
            />

            <input
              className="input-box"
              placeholder="Enter price"
              value={productDetails.price}
              ref={priceRef}
              onKeyDown={(e) => handleKeyDown(e, categoryRef)}
              onChange={(e) =>
                setProductDetails({
                  ...productDetails,
                  price: e.target.value,
                })
              }
            />

            <input
              className="input-box"
              placeholder="Enter category"
              value={productDetails.category}
              ref={categoryRef}
              onKeyDown={(e) => handleKeyDown(e, companyRef)}
              onChange={(e) =>
                setProductDetails({
                  ...productDetails,
                  category: e.target.value,
                })
              }
            />

            <input
              className="input-box"
              placeholder="Enter company"
              value={productDetails.company}
              ref={companyRef}
              onKeyDown={(e) => handleKeyDown(e, submitRef)}
              onChange={(e) =>
                setProductDetails({
                  ...productDetails,
                  company: e.target.value,
                })
              }
            />

            <button ref={submitRef} onClick={handleAddProduct}>
              Add Product
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;