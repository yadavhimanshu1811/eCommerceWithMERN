import { useState, useRef, useEffect } from "react";
import "./Addproduct.css";
import { useNotification } from "../../context/NotificationContext";
import Loader from "../Loader/Loader";

interface ProductDetails {
  name: string;
  price: string;
  category: string;
  company: string;
  contact: string;
  // imageURL: string
}

export const AddProduct = () => {
  const { showNotification } = useNotification();
  const [productDetails, setProductDetails] = useState<ProductDetails>({
    name: "",
    price: "",
    category: "",
    company: "",
    contact: "",
    // imageURL: "",
  });
  const [loading, setLoading] = useState(false);

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
    const { name, price, category, company, contact } = productDetails;

    if (!name || !price || !category || !company || !contact) {
      showNotification("Please add correct details", "error");
      nameRef.current?.focus();
      return;
    }
    setLoading(true);
    const API = import.meta.env.VITE_API_URL;
    try {
      const response = await fetch(`${API}/addproduct`, {
        method: "post",
        body: JSON.stringify(productDetails),
        headers: {
          "Content-Type": "application/json",
          authorization: JSON.parse(localStorage.getItem("token") || ""),
        },
      });
      const result = await response.json();
      if ("error" in result) {
        showNotification(result.error, "error");
      } else {
        showNotification("Product added successfully!", "success");

        setProductDetails({
          name: "",
          price: "",
          category: "",
          company: "",
          contact:"",
          // imageURL:""
        });

        nameRef.current?.focus();
      }
    } catch (err) {
      showNotification("Something went wrong!", "error");
    }
    setLoading(false);
  };

  return (
    <>
      <div className="add-product-container">
        <div className="add-product-div">
          <h1>Add Product</h1>
          {loading ? (
            <Loader />
          ) : (
            <>
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
              <input
                className="input-box"
                placeholder="Enter contact number"
                value={productDetails.contact}
                ref={companyRef}
                onKeyDown={(e) => handleKeyDown(e, submitRef)}
                onChange={(e) =>
                  setProductDetails({
                    ...productDetails,
                    contact: e.target.value,
                  })
                }
              />
              {/* <input
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
              /> */}

              <button ref={submitRef} onClick={handleAddProduct}>
                Add Product
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default AddProduct;
