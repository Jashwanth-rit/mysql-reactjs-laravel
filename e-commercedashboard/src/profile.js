import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

const Profile = () => {
    const [data, setdata] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        let auth = JSON.parse(localStorage.getItem("user"));
        setdata(auth);
    }, []);

    const goadd = () => {
        navigate("/add");
    };
    const goupdate = () => {
        navigate("/update/:_id");
    };
    const goproduct = () => {
        navigate("/");
    };
    const logout = () => {
        localStorage.clear();
        navigate('/regist');
    };

    return (
        <div className='profile-container'>
            <h1 className='profile-heading'>Welcome, {data.firstname}</h1>

            <Accordion defaultActiveKey="0" className="profile-accordion">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>E-commerce Platform Overview</Accordion.Header>
                    <Accordion.Body>
                        Our e-commerce project focuses on creating a robust and user-friendly online marketplace.
                        Users can browse products, filter by categories, view detailed descriptions, and add items
                        to their shopping carts. The platform is designed for high performance and scalability,
                        offering smooth interactions across different devices.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Key Features</Accordion.Header>
                    <Accordion.Body>
                        - Secure user authentication and profile management.<br />
                        - Advanced search and filter options for products.<br />
                        - Seamless payment gateway integration.<br />
                        - Order tracking and real-time notifications.<br />
                        - Product review and rating system.
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>

            <div className="button-group">
                <Button className='button-classic' variant="dark" onClick={goadd}>Add Product</Button>
                <Button className='button-classic' variant="dark" onClick={goupdate}>Update Product</Button>
                <Button className='button-classic' variant="dark" onClick={goproduct}>View Products</Button>
                <Button className='button-classic' variant="dark" onClick={logout}>Logout</Button>
            </div>
        </div>
    );
};

export default Profile;
