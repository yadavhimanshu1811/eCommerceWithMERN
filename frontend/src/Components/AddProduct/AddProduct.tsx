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
}

export const AddProduct = () => {
  const { showNotification } = useNotification();
  const [productDetails, setProductDetails] = useState<ProductDetails>({
    name: "",
    price: "",
    category: "",
    company: "",
    contact: "",
  });
  const [errorObj, setErrorObj] = useState({
    name: false,
    price: false,
    category: false,
    company: false,
    contact: false,
  });
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);

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
    let emptyInput = false;
    Object.keys(errorObj).forEach((key) => {
      if (productDetails[key as keyof typeof productDetails]?.trim() === "") {
        errorObj[key as keyof typeof errorObj] = true;
        showNotification("Please add all the details correctly.", "error");
        emptyInput = true;
      }else{
        errorObj[key as keyof typeof errorObj] = false;
      }
    });
    console.log(errorObj);
    setErrorObj(errorObj);
    if(emptyInput)return;

    setLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("company", company);
    formData.append("contact", contact);
    image && formData.append("image", image);
    const API = import.meta.env.VITE_API_URL;
    try {
      const response = await fetch(`${API}/addproduct`, {
        method: "post",
        // body: JSON.stringify({ ...productDetails, image }),
        body: formData,
        headers: {
          // "Content-Type": "application/json",
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
          contact: "",
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
                className={errorObj.name ? "input-box error" : "input-box"}
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
                className={errorObj.price ? "input-box error" : "input-box"}
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
                className={errorObj.category ? "input-box error" : "input-box"}
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
                className={errorObj.company ? "input-box error" : "input-box"}
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
                className={errorObj.contact ? "input-box error" : "input-box"}
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
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setImage(e.target.files ? e.target.files[0] : null)
                }
              />

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
