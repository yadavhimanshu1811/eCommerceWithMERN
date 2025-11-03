import { useEffect, useState } from "react";
import "./GetProduct.css";
import { Link } from "react-router-dom";

interface Product {
  name: string;
  category: string;
  company: string;
  price: string;
  _id: string;
}

const GetProduct = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const response = await fetch("http://localhost:3000/getproducts"); //TODO add pagination later
    const result = await response.json();
    console.log("get product", result);
    setProducts(result);
  };

  const deleteProduct = async (id: string) => {
    const response = await fetch(
      `http://localhost:3000/deleteproduct/${id}`,
      {
        method: "delete",
      }
    );
    const result = await response.json();
    if(result){
      getProducts();
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="product-container">
      <div>
        <h1>Products List</h1>
        {products.length ? (
          <div className="row">
            <div className="cell-header">S.no</div>
            <div className="cell-header">name</div>
            <div className="cell-header">price</div>
            <div className="cell-header">company</div>
            <div className="cell-header">category</div>
            <div className="cell-header">Actions</div>
          </div>
        ) : null}
        {products.length ? (
          products.map((item: Product, index: number) => {
            return (
              <div className="row" key={item._id}>
                <div className="cell">{index + 1}</div>
                <div className="cell">{item.name}</div>
                <div className="cell">{item.price}</div>
                <div className="cell">{item.company}</div>
                <div className="cell">{item.category}</div>
                <div className="cell">
                  <button onClick={() => deleteProduct(item._id)}>
                    Delete
                  </button>
                  <Link to={`/update/${item._id}`}>Update</Link>
                </div>
              </div>
            );
          })
        ) : (
          <div>No products are added</div>
        )}
      </div>
    </div>
  );
};

export default GetProduct;
