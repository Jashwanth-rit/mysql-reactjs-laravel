
//making product should be added by taking name or brand as input
//by using other database if name matchs with any then add else alert call to enter other name

import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import Row from 'react-bootstrap/Row';
import React,{useState,useEffect} from 'react'
 import { useNavigate } from 'react-router-dom';
// import { name } from 'ejs';




const Add = ()=>{

    const [brand,setname] = useState("");

    const collectdata = async (e)=>{

      //same route which have add should be created in beckend or index.js file else not work
        let result =  await fetch('http://localhost:6600/add',{
    
          method:'post',
          body: JSON.stringify({brand}),
          headers:{
    
            'Content-Type':"application/json"
          }
        })
        console.warn(result)
        //.json() helps to convert result in json formate 
        // and remember u cant use toObject() in front end and .json() in backend 
        // .json() in frontend
        // toObject() in backend
        result  = await result.json()
        console.warn(result)
        
        //result._id can be used only when there exist feild in that name "_id"
        if(result._id){
            alert("product pushed successfully")

        }
        else{
            alert("invalid input search other")

        }

e.preventDefault();
setname("");

    }

    return (
        <div>
            <h1>Add page</h1>

            <Form>

          
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email"  onChange = {(e)=>setname(e.target.value)}/>
      </Form.Group>
      {/* <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value = {email} onChange = {(e)=>setemail(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value = {email} onChange = {(e)=>setemail(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value = {email} onChange = {(e)=>setemail(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value = {email} onChange = {(e)=>setemail(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value = {email} onChange = {(e)=>setemail(e.target.value)}/>
      </Form.Group>
      */}
    </Form>
    <Button variant="dark" onClick = {collectdata}>Add !!</Button>
    <Button variant="dark" onClick = {Add}>Shop again !!</Button>
        </div>
    )
}

export default Add;