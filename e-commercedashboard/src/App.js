//import logo from './logo.svg';
//this is app.js
import './App.css';
import Header from './header'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './login'
import Add from './addproduct'
import Update from './updateprod'
import Regist from './register'
import Profile from './profile'
import Logout from './logout'
import Footer from './footer'
import Product from './products'
import Private from './private'


function App() {
  return (
    <div className="App">
      
    <BrowserRouter>
    <Header/>
     
    
     
     <Routes>
     <Route element={<Private/>}>
     <Route path="/" element = { <Product/>}/>
    
     <Route path="/profile" element = { <Profile/>}/>

    
    
 
     
     <Route path="/add"  element={ <Add/>}/>
    
    
     <Route path="/update/:id" element={<Update/>}/>

     <Route path="/logout" element = { <Logout/>}/>
</Route>

<Route path="/regist" element={ <Regist/>}/>
<Route path="/login" element={ <Login/>}/>
  
     
     </Routes>
     
    </BrowserRouter>

    <Footer/>
         </div>
  );
}

export default App;
