import React from "react"; 
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import EditUser from "./EditUser/editUser";
import UserDetails from "./UserDetails/userDetails";

function User(){


return (
<div>  


<Routes>



<Route path="/" element={<Navigate replace to="details" />} />    
<Route  path="edit"  element={<EditUser/>} />
<Route  exact path="details"  element={<UserDetails/>} />      
        
        
     
        
        
        
         



       
      </Routes>

</div>

);


} 
export default User;