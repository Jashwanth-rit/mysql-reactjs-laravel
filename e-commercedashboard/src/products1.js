

//making add  and update in alert page and adding in that and also button for add and update

import React,{useState,useEffect} from 'react'
import {Table} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';


import Row from 'react-bootstrap/Row';




const Product = ()=>{

    const [products,setprod] = useState([]);
    const [data,setdata] = useState("");
useEffect(()=>{

collectdata();



},[]);
let navigate = useNavigate();

const collectdata =  async ()=>{
    let result =  await fetch('http://localhost:6600',{
      headers:{
        authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}`
      }
    });
    result = await result.json();
    setprod(result);
    
    

}
const search = async (e)=>{
  setdata(e.target.value)
  let key = e.target.value;
  let result = await fetch(`http://localhost:6600/search/${key}`)
result = await result.json();
if(result){
  setprod(result)
  // collectdata();

}
else{

}
}

const adddata = () =>{
  const val = prompt("")
}

const updatedata =(_id)=>{

navigate("/update/"+_id)
}

const deletedata = async (_id)=>{
  console.warn(_id)
    let dlt = await fetch('http://localhost:6600/delete',{
        method:'delete',
        body: JSON.stringify({_id}),
        headers:{

          'Content-Type':"application/json"
        }

    })
console.warn(dlt)
dlt = await dlt.json();
if(dlt){
  collectdata();
}




}
const wid = {
  width: '800px'
}



    return (
        <div>
            <h1>Product page</h1>
            <div >
           <div className='searchbar'>
           <Form inline>
        <Row>
          <Col xs="auto">
            <Form.Control
              type="text"
              defaultValue={data}
              placeholder="Search"
              className=" mr-sm-2 barsearch"
              style={wid} 
              onChange={search}
            />
          </Col>
          <Col xs="auto">
            <Button type="submit" variant='dark' onClick={search}>Clear</Button>
          </Col>
        </Row>
      </Form>
           </div>{ products.length>0?
            <Table  >
      <thead variant="dark" striped >
         <tr>
         <th>sl_no</th>
         <th>id</th>
         <th>price</th>
           <th>Name</th>
           <th>brand</th>
           <th>category</th>
          
         </tr>
       </thead>
      
         <tbody>
           { 
      products.map((item,i)=>
        
        <tr kay = {i}>
             <td  >{i}</td>
          <td  >{item.id}</td>
          <td>{item.price}</td>
          <td>{item.name}</td>
          <td>{item.brand}</td>
          <td>{item.category}</td>
          <Button  className= "butt" variant="dark" onClick = {()=>{adddata()}}>Add</Button>
          <Button  className= "butt" variant="dark" onClick = {()=>{updatedata(item._id)}}>update!!</Button>
          <Button  className= "butt" variant="dark" onClick = {()=>{deletedata(item._id)}}>Dlt!!</Button>
         
        </tr>
       
       
      


      )
    }
    </tbody>
    </Table>: <span className='noresult'>No data found!!</span>}
            </div>
        </div>
    )
}

export default Product;