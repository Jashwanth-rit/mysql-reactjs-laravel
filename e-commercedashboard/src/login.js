import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import Row from 'react-bootstrap/Row';
import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';


const Login = ()=>{

    const [email,setemail] = useState("");

    const [password,setpassword] = useState("");
const navigate = useNavigate();

// const checkdata = ()=>{
//   console.warn(email);
//   const auth = localStorage.getItem(`user${email}`);
//   if(auth){
//     navigate('/')
//   }
// }

useEffect(()=>
    {
      const auth = localStorage.getItem('user');
      
      if(auth){
        navigate('/')
      }
    },[]);

    const gotoregist=()=>{
      navigate('/regist')
    }

const collectdata = async ()=>{
    let result =  await fetch(`http://localhost:8000/api/login`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
      },
      body: JSON.stringify({ email, password })
  });


    result = await result.json();
    console.warn( result);
    if(result){
      //remember name "user" which help u to access data in it during Add , Update , dlt.
      //here first parameter is we can give and we should remember 
      localStorage.setItem("user",JSON.stringify(result))
      //  localStorage.setItem("token",JSON.stringify(result.auth))
      navigate("/")

    }
    else{
        alert("register first !! or u entered wrong email or password u setted!!!");
        navigate("/regist")
    }
}

    return (
        <div className='App  textdo' >
            <h1>Alert: register before login</h1>
            <Form>

          
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value = {email} onChange = {(e)=>setemail(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password"  value = {password} onChange = {(e)=>setpassword(e.target.value)}/>
      </Form.Group>
    </Form>
    <Button variant="dark" onClick = {collectdata}>login !!</Button>
    <Button variant="dark" onClick = {gotoregist}>new regist !!</Button>
        </div>
    
    )
}

export default Login;