
//making seperate add tab to input to data base what we enter

import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import Row from 'react-bootstrap/Row';
import React,{useState,useEffect} from 'react'
 import { useNavigate } from 'react-router-dom';
// import { name } from 'ejs';




const Add = ()=>{

    const [id,setid] = useState("");
    const [err,seterr] = useState(false);
    const [price,setprice] = useState("");
    const [name,setname] = useState("");
    const [url,seturl] = useState("");
    const [discription,setdis] = useState("");

    const collectdata = async (e)=>{

      e.preventDefault();
        if(!id || !price || !name || !url || !discription){
            alert("enter all the required inputs")
            seterr(true);
            return false;
        }


//"_id" is broser given id we can access it by knowing name "user"
//in "user" object it will be stored
//"parse" is used because in "user" data will be stored in form of string
// so to convert it to object type and store it is used 


// let userid = JSON.parse(localStorage.getItem('user'))._id

        let result =  await fetch('http://localhost:8000/api/add',{
    
          method:'post',
          body: JSON.stringify({id,price,name,url,discription}),
          headers:{
    
            'Content-Type':"application/json"
          }
        })
        console.warn(result)
        result  = await result.json()
        console.warn(result)
        
        
        if(result.id){
          setid("");
            setprice("");
            setname("");
            seturl("");
            setdis("");
            seterr(false);
            alert("product pushed successfully")
            

        }
        else{
            alert("invalid input search other")

        }



    }

    return (
        <div className='App textdo'>
            <h1>Add page</h1>

            <Form>

          
            <Form.Group className="mb-3" controlId="formGroupId">
    <Form.Label>Id</Form.Label>
    <Form.Control
        className={err ? "red" : "green"}
        type="text"
        placeholder={err ? "*required" : "Enter id"}
        value={id}
        onChange={(e) => setid(e.target.value)}
    />
</Form.Group>

<Form.Group className="mb-3" controlId="formGroupPrice">
    <Form.Label>Price</Form.Label>
    <Form.Control
        className={err ? "red" : "green"}
        type="text"
        placeholder={err ? "*required" : "Enter price"}
        value={price}
        onChange={(e) => setprice(e.target.value)}
    />
</Form.Group>

<Form.Group className="mb-3" controlId="formGroupName">
    <Form.Label>Name</Form.Label>
    <Form.Control
        className={err ? "red" : "green"}
        type="text"
        placeholder={err ? "*required" : "Enter name"}
        value={name}
        onChange={(e) => setname(e.target.value)}
    />
</Form.Group>

<Form.Group className="mb-3" controlId="formGroupUrl">
    <Form.Label>Url</Form.Label>
    <Form.Control
        className={err ? "red" : "green"}
        type="text"
        placeholder={err ? "*required" : "Enter url"}
        value={url}
        onChange={(e) => seturl(e.target.value)}
    />
</Form.Group>

<Form.Group className="mb-3" controlId="formGroupDescription">
    <Form.Label>Description</Form.Label>
    <Form.Control
        className={err ? "red" : "green"}
        type="text"
        placeholder={err ? "*required" : "Enter description"}
        value={discription}
        onChange={(e) => setdis(e.target.value)}
    />
</Form.Group>

     
    </Form>
    <Button className='butt' variant="dark" onClick = {collectdata}>Add !!</Button>
    
        </div>
    )
}

export default Add;