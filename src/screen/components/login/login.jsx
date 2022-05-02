import { MenuItem ,TextField} from "@mui/material";
import axios from "axios";
import React, { useContext  , useState
} from "react";
import image from "./hostel.jpg"
import { Navigate , Route, Routes, useNavigate} from "react-router-dom";



import "./login.css"; 

 




function Login(props){    
   

    var username ="";
    var password = ""; 

const handleSubmit =async(e)=>{  
  
   e.preventDefault(); 
   try {  
     console.log(props.isAdmin)
     const type = (props.isAdmin==true)?"admin":"user"; 
     console.log(type)
      const data = await axios.post('/api/user/login',{
        
         
          "username":  username,
          "password":password,
          
         
   }) ; 
      console.log(data.data)
       if(data.data &&data.data.message=="Success") {
         localStorage.setItem("token",data.data.token);  
       
       if(props.isAdmin) {
        
        window.location='/admin';  
       }
       
         else { 
          
          window.location = '/'
         

         }
      

   
       }
    
       else console.log("error occurred")
   } catch (error) {
     console.log("Error " + error) 
   }



 }  

 function handleChange(e){ 
    if(e.target.type=="password")
    password=e.target.value;
    else 
    username=e.target.value;
    
    



 }


return ( 

<>
  {props.isAdmin?<h1>Admin Portal</h1>:null}

  <div class="login">

  <div class="login-card">

 
  <div class="login-form">
<h3>SignIn</h3>
<input type="text" onChange={handleChange} placeholder="Username" id=""></input>
<input type="password" onChange={handleChange} placeholder="Password" id=""></input>
<button onClick={handleSubmit}>Log In</button>

  </div> 
  <img src={image}></img>


  </div>




   </div>


















</>


);

     
}

export default Login;