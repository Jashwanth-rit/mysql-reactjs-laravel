import Navbar from "react-bootstrap/Navbar";
// import Button from 'react-bootstrap/Button';
// import Container from 'react-bootstrap/Container';
// import Form from 'react-bootstrap/Form';
import Nav from "react-bootstrap/Nav";
//import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from "react-router-dom";
//import {useEffect, useRef} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faHome } from '@fortawesome/free-solid-svg-icons';
import "./App.css";

const Header = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark">
        <img
          className="cartimg"
          src="https://imgs.search.brave.com/cCsHHeQsIsGAZx1pZgOYTeqYc7CPiRRliZ9JEfzxZpc/rs:fit:500:0:0/g:ce/aHR0cDovL3d3dy5j/bGtlci5jb20vY2xp/cGFydHMvbC96LzMv/TC9oLzMvd2hpdGUt/c2hvcHBpbmctY2Fy/dC1tZC5wbmc"
          alt="cart-img"
        />
        <FontAwesomeIcon icon="fa-solid fa-cart-flatbed-suitcase" />

        <Navbar.Brand href="#home">Sastha Mart</Navbar.Brand>

        {auth ? (
          <Nav className="me-auto">
            <Link to="">Products</Link>

            <Link to="profile">Profile</Link>

            <Link to="add">Add</Link>
            <Link to="update/:_id">Update</Link>
            <Link onClick={logout} to="/login">
              Logout ({JSON.parse(auth).firstname})
            </Link>
          </Nav>
        ) : (
          <Nav className="justify-content-end flex-grow-1 pe-3">
            <Link className="rightshift" to="/login">
              Login
            </Link>
            <Link className="rightshift" to="regist">
              Register
            </Link>
          </Nav>
        )}
      </Navbar>
    </div>
  );
};

export default Header;




// import React, { useState } from "react";
// import Navbar from "react-bootstrap/Navbar";
// import Nav from "react-bootstrap/Nav";
// import { Link, useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCartFlatbedSuitcase } from "@fortawesome/free-solid-svg-icons";
// import "./App.css";
// import Add from './addproduct'
// import Modal from 'react-bootstrap/Modal';


// const Header = () => {
//   const [showModal, setShowModal] = useState(false);
//   const auth = localStorage.getItem("user");
//   const navigate = useNavigate();

//   const logout = () => {
//     localStorage.clear();
//     navigate("/login");
//   };

//   const handleShow = () => setShowModal(true);
//   const handleClose = () => setShowModal(false);

//   return (
//     <div>
//       <Navbar bg="dark" data-bs-theme="dark">
//         <img
//           className="cartimg"
//           src="https://imgs.search.brave.com/cCsHHeQsIsGAZx1pZgOYTeqYc7CPiRRliZ9JEfzxZpc/rs:fit:500:0:0/g:ce/aHR0cDovL3d3dy5j/bGtlci5jb20vY2xp/cGFydHMvbC96LzMv/TC9oLzMvd2hpdGUt/c2hvcHBpbmctY2Fy/dC1tZC5wbmc"
//           alt="cart-img"
//         />
//         <FontAwesomeIcon icon={faCartFlatbedSuitcase} />

//         <Navbar.Brand href="#home">Sastha Mart</Navbar.Brand>

//         {auth ? (
//           <Nav className="me-auto">
//             <Link to="">Products</Link>
//             <Link to="profile">Profile</Link>
//             <Link to="#" onClick={handleShow}>Add</Link>
//             <Link to="update/:_id">Update</Link>
//             <Link onClick={logout} to="/login">
//               Logout ({JSON.parse(auth).firstname})
//             </Link>
//           </Nav>
//         ) : (
//           <Nav className="justify-content-end flex-grow-1 pe-3">
//             <Link className="rightshift" to="/login">
//               Login
//             </Link>
//             <Link className="rightshift" to="regist">
//               Register
//             </Link>
//           </Nav>
//         )}
//       </Navbar>

//       {/* Modal for adding a product */}
//       <Modal show={showModal} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Add Product</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Add />
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// };

// export default Header;
