import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css'; 

const Add = () => {
    const [id, setId] = useState("");
    const [price, setPrice] = useState("");
    const [name, setName] = useState("");
    const [url, setUrl] = useState("");
    const [description, setDescription] = useState("");
    const [err, setErr] = useState(false);
    
    const collectData = async (e) => {
        e.preventDefault();
    
        if (!id || !price || !name || !url || !description) {
            setErr(true);
            return;
        }
    
       
            let result = await fetch('http://localhost:8000/api/add', {
                method: 'POST',
                body: JSON.stringify({ id, price, name, url, description }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (!result.ok) {
                // If response is not ok, log the error details
                let errorMsg = await result.text(); // Get the raw error message
                console.error('Error:', errorMsg);
                alert('Server error: ' + result.status);
                return;
            }
    
            result = await result.json();
            console.log("result", result);
            
            if (result.id) {
                setId("");
                setPrice("");
                setName("");
                setUrl("");
                setDescription("");
                setErr(false);
                alert("Product added successfully!");
            } else {
                alert("Invalid input. Try again.");
            }
       
           
        
    };
    

    return (
        <div className='add-container'>
            <h1 className='add-heading'>Add Product</h1>
            <Form onSubmit={collectData} className="add-form">
                <Form.Group className="mb-3" controlId="formGroupId">
                    <Form.Label></Form.Label>
                    <Form.Control
                        className={err && !id ? "input-error" : ""}
                        type="text"
                        placeholder={err && !id ? "*Required" : "Enter product ID"}
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGroupPrice">
                    <Form.Label></Form.Label>
                    <Form.Control
                        className={err && !price ? "input-error" : ""}
                        type="text"
                        placeholder={err && !price ? "*Required" : "Enter price"}
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGroupName">
                    <Form.Label></Form.Label>
                    <Form.Control
                        className={err && !name ? "input-error" : ""}
                        type="text"
                        placeholder={err && !name ? "*Required" : "Enter product name"}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGroupUrl">
                    <Form.Label></Form.Label>
                    <Form.Control
                        className={err && !url ? "input-error" : ""}
                        type="text"
                        placeholder={err && !url ? "*Required" : "Enter product image URL"}
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGroupDescription">
                    <Form.Label></Form.Label>
                    <Form.Control
                        className={err && !description ? "input-error" : ""}
                        type="text"
                        placeholder={err && !description ? "*Required" : "Enter product description"}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Form.Group>

                <Button className="button-classic" variant="dark" type="submit">Add Product</Button>
            </Form>
        </div>
    );
};

export default Add;


// import React, { useState } from 'react';
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
// import './style.css'; 

// const Add = () => {
//     const [id, setId] = useState("");
//     const [price, setPrice] = useState("");
//     const [name, setName] = useState("");
//     const [url, setUrl] = useState("");
//     const [description, setDescription] = useState("");
//     const [err, setErr] = useState(false);
    
//     const collectData = async (e) => {
//         e.preventDefault();

//         if (!id || !price || !name || !url || !description) {
//             setErr(true);
//             return;
//         }

//         let result = await fetch('http://localhost:8000/api/add', {
//             method: 'post',
//             body: JSON.stringify({ id, price, name, url, description }),
//             headers: {
//                 'Content-Type': "application/json"
//             }
//         });

//         result = await result.json();
//         if (result.id) {
//             setId("");
//             setPrice("");
//             setName("");
//             setUrl("");
//             setDescription("");
//             setErr(false);
//             alert("Product added successfully!");
//         } else {
//             alert("Invalid input. Try again.");
//         }
//     };

//     return (
//         <div className='add-container'>
//             <h1 className='add-heading'>Add Product</h1>
//             <Form onSubmit={collectData} className="add-form">
//                 <Form.Group className="mb-3" controlId="formGroupId">
//                     <Form.Label>ID</Form.Label>
//                     <Form.Control
//                         className={err && !id ? "input-error" : ""}
//                         type="text"
//                         placeholder={err && !id ? "*Required" : "Enter product ID"}
//                         value={id}
//                         onChange={(e) => setId(e.target.value)}
//                     />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="formGroupPrice">
//                     <Form.Label>Price</Form.Label>
//                     <Form.Control
//                         className={err && !price ? "input-error" : ""}
//                         type="text"
//                         placeholder={err && !price ? "*Required" : "Enter price"}
//                         value={price}
//                         onChange={(e) => setPrice(e.target.value)}
//                     />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="formGroupName">
//                     <Form.Label>Name</Form.Label>
//                     <Form.Control
//                         className={err && !name ? "input-error" : ""}
//                         type="text"
//                         placeholder={err && !name ? "*Required" : "Enter product name"}
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                     />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="formGroupUrl">
//                     <Form.Label>Image URL</Form.Label>
//                     <Form.Control
//                         className={err && !url ? "input-error" : ""}
//                         type="text"
//                         placeholder={err && !url ? "*Required" : "Enter product image URL"}
//                         value={url}
//                         onChange={(e) => setUrl(e.target.value)}
//                     />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="formGroupDescription">
//                     <Form.Label>Description</Form.Label>
//                     <Form.Control
//                         className={err && !description ? "input-error" : ""}
//                         type="text"
//                         placeholder={err && !description ? "*Required" : "Enter product description"}
//                         value={description}
//                         onChange={(e) => setDescription(e.target.value)}
//                     />
//                 </Form.Group>

//                 <Button className="button-classic" variant="dark" type="submit">Add Product</Button>
//             </Form>
//         </div>
//     );
// };

// export default Add;
