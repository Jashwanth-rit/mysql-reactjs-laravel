
//making add and update in same means if id already there then just update if not then add the product with input
//here i used "id" for finding data and "_id" for deleting the data
//but we can use id feild twice and we can do for unique id i used _id
//in development file always go step by step 

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
    const [brand,setbrand] = useState("");
    const [category,setcat] = useState("");

    // const collectdata = async (e)=>{
    //     if(!id || !price || !name || !brand || !category){
    //         alert("enter all the required inputs")
    //         seterr(true);
    //         return false;
    //     }

    // useEffect(()=>{

    //     collectdata();
        
        
    //     })
        
    //     const collectdata =  async ()=>{
    //         let result =  await fetch('http://localhost:6600');
    //         result = await result.json();
    //         setprod(result);
            
            
        
    //     }


        //let userid = JSON.parse(localStorage.getItem('user'))._id
       let addupdate =  async() =>{
    alert("update is running")
        let result =  await fetch('http://localhost:6600/find',{
    
            method:'post',
            //id must be feild present there then only u can pass here like "id"
            body: JSON.stringify({id}),
            headers:{
      
              'Content-Type':"application/json"
            }
          })
          console.warn(result)
          result = await result.json()
          console.warn(result)
           let _id = result._id;
          console.warn(_id)
          if(_id){


            let dlt = await fetch('http://localhost:6600/delete',{
                method:'delete',
                //_id must be feild present there then only u can pass here like "_id"
                body: JSON.stringify({_id}),
                headers:{
        
                  'Content-Type':"application/json"
                }
        
            })
            console.warn(dlt)
            if(!id || !price || !name || !brand || !category){
                alert("enter all the required inputs")
                seterr(true);
                return false;
            }
    
    
    //same name like "user" should be given during login else shows err
            let userid = JSON.parse(localStorage.getItem('user'))._id
            console.warn(userid)
            let result =  await fetch('http://localhost:6600/add',{
        
              method:'post',
              body: JSON.stringify({id,userid,price,name,brand,category}),
              headers:{
        
                'Content-Type':"application/json"
              }
            })
            
  
             
  
              alert("product updated successfully")
  
          }
          else{
              
                  if(!id || !price || !name || !brand || !category){
                      alert("enter all the required inputs")
                      seterr(true);
                      return false;
                  }
          
          
          
                  let userid = JSON.parse(localStorage.getItem('user'))._id
                  let result =  await fetch('http://localhost:6600/add',{
              
                    method:'post',
                    body: JSON.stringify({id,userid,price,name,brand,category}),
                    headers:{
              
                      'Content-Type':"application/json"
                    }
                  })
                  console.warn(result)
                  result  = await result.json()
                  console.warn(result)
                  
                  
                  if(result._id){
                      alert("product pushed successfully")
          
                  }
                  else{
                      alert("invalid input search other")
          
                  }
          
          
          
              }
  
  
              
  
       }


    

    return (
        <div className='App textdo'>
            <h1>Add page</h1>

            <Form>

          
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>id</Form.Label>
        <Form.Control className={err?"red":"green"} type="email" placeholder={err?"*required":"enter id"}  onChange = {(e)=>setid(e.target.value)}/>
      </Form.Group>
     
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>price</Form.Label>
        <Form.Control className={err?"red":"green"} type="email" placeholder={err?"*required":"enter price"}   onChange = {(e)=>setprice(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>name</Form.Label>
        <Form.Control className={err?"red":"green"} type="email" placeholder={err?"*required":"enter name"}   onChange = {(e)=>setname(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>brand</Form.Label>
        <Form.Control className={err?"red":"green"} type="email" placeholder={err?"*required":"enter brand"}   onChange = {(e)=>setbrand(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>category</Form.Label>
        <Form.Control className={err?"red":"green"} type="email" placeholder={err?"*required":"enter category"}   onChange = {(e)=>setcat(e.target.value)}/>
      </Form.Group>
     
    </Form>
    <Button className='butt' variant="dark" onClick = {addupdate}>Add !!</Button>
    <Button className='butt' variant="dark" onClick = {Add}>Shop again !!</Button>
        </div>
    )
}

export default Add;


