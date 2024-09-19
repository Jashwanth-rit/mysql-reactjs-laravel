import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './style.css'; 

const Update = () => {
  const [id, setId] = useState("");
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);
  
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/update/${params.id}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        if (data.name) {
          setId(data.id);
          setPrice(data.price);
          setName(data.name);
          setUrl(data.url);
          setDescription(data.description);
        } else {
          alert("Product not found");
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
        alert("Failed to fetch product data.");
      }
    };

    fetchProductData();
  }, [params.id]);

  const updateData = async () => {
    if (!id || !price || !name || !url || !description) {
      alert("Please fill out all fields.");
      setError(true);
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/api/update/${params.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ id, price, name, url, description })
      });

      const result = await response.json();
      if (result) {
        navigate("/");
      } else {
        alert("Failed to update product.");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product.");
    }
  };

  return (
    <div className='update-container'>
      <h1>Update Product</h1>
      <Form>
        <Form.Group className="mb-3" controlId="formGroupId">
          <Form.Label></Form.Label>
          <Form.Control
            className={error ? "form-control red" : "form-control"}
            type="text"
            value={id}
            placeholder={error ? "*required" : "Enter ID"}
            onChange={(e) => setId(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGroupPrice">
          <Form.Label></Form.Label>
          <Form.Control
            className={error ? "form-control red" : "form-control"}
            type="text"
            value={price}
            placeholder={error ? "*required" : "Enter Price"}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGroupName">
          <Form.Label></Form.Label>
          <Form.Control
            className={error ? "form-control red" : "form-control"}
            type="text"
            value={name}
            placeholder={error ? "*required" : "Enter Name"}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGroupUrl">
          <Form.Label></Form.Label>
          <Form.Control
            className={error ? "form-control red" : "form-control"}
            type="text"
            value={url}
            placeholder={error ? "*required" : "Enter URL"}
            onChange={(e) => setUrl(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGroupDescription">
          <Form.Label></Form.Label>
          <Form.Control
            className={error ? "form-control red" : "form-control"}
            type="text"
            value={description}
            placeholder={error ? "*required" : "Enter Description"}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
      </Form>
      <Button className='submit-button' variant="dark" onClick={updateData}>Update</Button>
    </div>
  );
};

export default Update;
