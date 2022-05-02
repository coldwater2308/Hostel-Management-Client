
import { BrowserRouter, Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';
import React, { useContext } from "react"

import Dashboard from './dashboard/dashboard';
import Sidebar from '../utitComponents/sidebar';

import "./home.css";
import { userContext } from '../../../App';
function Screen() {  
const [user]=  useContext(userContext)
const navigate =useNavigate();
  console.log("User"+user)
  return (  
  
    

<div > 
<div className='top' > 
  <div style={{width:"40px",height: "40px",borderRadius: " 20px",backgroundColor : "blue" ,margin: "0 20px"}}></div>
<button onClick={()=> { localStorage.removeItem("token"); window.location='/'} }>Log Out</button>
</div>
<Sidebar/> 


<nav>  
<div  className='main' > 




    <Dashboard/>


</div>
      
   
      </nav>

      </div>
   
  );
}
 
export default Screen ;