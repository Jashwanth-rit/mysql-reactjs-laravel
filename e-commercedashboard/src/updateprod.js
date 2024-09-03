



import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import Row from 'react-bootstrap/Row';
import React,{useState,useEffect} from 'react'
 import { useNavigate, useParams } from 'react-router-dom';
// import { name } from 'ejs';




const Update = (props)=>{

    const [id,setid] = useState("");
    const [err,seterr] = useState(false);
    const [price,setprice] = useState("");
    const [name,setname] = useState("");
    const [url,seturl] = useState("");
    const [discription,setdis] = useState("");

let navigate = useNavigate();

    const params = useParams();
     useEffect(()=>{
      console.warn("props",props.id);
      console.warn("params.id",params.id);
         collectdata();
     },[]);

     const collectdata = async () => {
      
          let result = await fetch(`http://localhost:8000/api/update/${params.id}`);
          
          if (!result.ok) {
              throw new Error('Network response was not ok');
          }
          console.warn("result",result);
          let data = await result.json();
          console.warn("data",data);
          
          if (data.name) {
              setid(data.id);
              setprice(data.price);
              setname(data.name);
              seturl(data.url);
              setdis(data.discription);
          } else {
              alert("Product not found");
          }
      
  }
  
    const updatedata = async ()=>{
        let result =  await fetch(`http://localhost:8000/api/update/${params.id}`,{
  
          method:'post',
          body: JSON.stringify({id,price,name,url,discription}),
          headers:{
  
            'Content-Type':"application/json",
            "Accept":"application/json",
          }
        })
  
       
          result = await result.json();
          console.warn( result);
          if(result){
            
            navigate("/")
  
          }
         
      }

    return (
        <div className='App textdo'>
            <h1>Update page</h1>

            <Form>

          
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>id</Form.Label>
        <Form.Control className={err?"red":"green"} type="text" defaultValue= {id}  placeholder={err?"*required":"enter id"}  onChange = {(e)=>{setid(e.target.value)}}/>
      </Form.Group>
     
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>price</Form.Label>
        <Form.Control className={err?"red":"green"} type="text" defaultValue = {price} placeholder={err?"*required":"enter price"}   onChange = {(e)=>setprice(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>name</Form.Label>
        <Form.Control className={err?"red":"green"} type="text" defaultValue = {name} placeholder={err?"*required":"enter name"}   onChange = {(e)=>setname(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>brand</Form.Label>
        <Form.Control className={err?"red":"green"} type="text" defaultValue = {url} placeholder={err?"*required":"enter brand"}   onChange = {(e)=>seturl(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>category</Form.Label>
        <Form.Control className={err?"red":"green"} type="text" defaultValue = {discription} placeholder={err?"*required":"enter category"}   onChange = {(e)=>setdis(e.target.value)}/>
      </Form.Group>
     
    </Form>
    <Button className='butt' variant="dark" onClick = {updatedata}>update !!</Button>
    
        </div>
    )
}

export default Update;