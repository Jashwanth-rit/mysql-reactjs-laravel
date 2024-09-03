import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import './App.css';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      let response = await fetch(`http://localhost:8000/api/products`);
      let data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const search = async (e) => {
    e.preventDefault();
    setSearchQuery(e.target.value);
    let name = searchQuery

    try {
      let response = await fetch(`http://localhost:8000/api/search`,{
        method:'post',
        body: JSON.stringify({name}),
        headers:{

          'Content-Type':"application/json",
          "Accept":"application/json",
          
        }

      });
      let data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error searching products:", error);
    }
  };

  const updateProduct = (id) => {
    navigate(`/update/${id}`);
  };

  const deleteProduct = async (id) => {
    try {
      let response = await fetch("http://localhost:8000/api/delete", {
        method: "POST", // POST request for deletion
        body: JSON.stringify({ id }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      let result = await response.json();
      if (result.success) {
        fetchProducts(); // Refresh the products list
      } else {
        console.error("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div>
      <h1>Product page</h1>
      <div>
        <div className="searchbar">
          <Form inline>
            <Row>
              <Col xs="auto">
                <Form.Control
                  type="text"
                  value={searchQuery}
                  placeholder="Search"
                  className="mr-sm-2 barsearch"
                  onChange={search}
                />
              </Col>
              <Col xs="auto">
                <Button type="submit" variant="dark" onClick={() => setSearchQuery('')}>
                  Clear
                </Button>
              </Col>
            </Row>
          </Form>
        </div>

        <div className="cproducts">
          {products.length > 0 ? (
            products.map((item, index) => (
              <div className="cproduct" key={index}>
                <div className="cimgdiv">
                  <img src={item.url} alt={item.name} />
                </div>
                <div className="cinfodiv">
                  <span>{item.name}</span>
                  <span>Price: ${item.price}</span>
                </div>
                <button
                  onClick={() => deleteProduct(item.id)}
                >
                  Dlt!!
                </button>
                <button
                  onClick={() => updateProduct(item.id)}
                >
                  update!!
                </button>
              </div>
            ))
          ) : (
            <h2>Your cart is empty</h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
