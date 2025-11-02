import { useEffect, useState } from "react";
import "./GetProduct.css";

interface Product {
  name: string;
  category: string;
  company: string;
  price: string;
}

const GetProduct = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const response = await fetch("http://localhost:3000/getproducts"); //TODO add pagination later
    const result = await response.json();
    console.log("get product", result);
    setProducts(result);
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
          </div>
        ) : null}
        {products.length ? (
          products.map((item: Product, index:number) => {
            return (
              <div className="row">
                <div className="cell">{index+1}</div>
                <div className="cell">{item.name}</div>
                <div className="cell">{item.price}</div>
                <div className="cell">{item.company}</div>
                <div className="cell">{item.category}</div>
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
