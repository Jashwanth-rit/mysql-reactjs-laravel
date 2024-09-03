import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import Row from 'react-bootstrap/Row';
import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';




const Regist = ()=>{


    const [firstname,setfname] = useState("");
    const [lastname,setlname] = useState("");

    const [email,setemail] = useState("");

    const [password,setpassword] = useState("");
const navigate = useNavigate();
useEffect(()=>
  {
    const auth = localStorage.getItem('user');
    
    if(auth){
      navigate('/')
    }
  },[]);
    
    const collectdata = async ()=>{
      let result =  await fetch('http://localhost:8000/api/regist',{

        method:'post',
        body: JSON.stringify({firstname,lastname,email,password}),
        headers:{

          'Content-Type':"application/json",
          "Accept":"application/json",
          
        }
      })

      result = await result.json();
        console.warn( result.id);
        if(result){
          localStorage.setItem(`user`,JSON.stringify(result))
          //localStorage.setItem("token",JSON.stringify(result.auth))
          navigate("/")

        }
       
    }
const logingo = ()=>{

  navigate("/login")
}


    return (
        <div className='App  textdo' >
            <h1>Register or sign up Here!!!</h1>
            <Form>

            <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>username</Form.Label>
        <Row>
        <Col>
          <Form.Control placeholder="First name" value = {firstname} onChange = {(e)=>setfname(e.target.value)}  />
        </Col>
        <Col>
          <Form.Control placeholder="Last name" value = {lastname} onChange = {(e)=>setlname(e.target.value)}/>
        </Col>
      </Row>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value = {email} onChange = {(e)=>setemail(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password"  value = {password} onChange = {(e)=>setpassword(e.target.value)}/>
      </Form.Group>
    </Form>
    <Button   className = "butt" variant="dark" onClick = {collectdata}>Sign up!!</Button>
    <Button  className = "butt" variant="dark" onClick = {logingo}>go to Login</Button>
        </div>
    )
}

export default Regist;