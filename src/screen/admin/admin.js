import { LocalDiningOutlined, TramOutlined } from '@material-ui/icons';
import React, { useEffect } from 'react'
import { Route, Routes ,Navigate, Link, NavLink} from 'react-router-dom'

import Student from "../components/home/dashboard/Students/Students"
import "./admin.css"
import Home from './home/Home';
import Profile from './profile/Profile';
function Admin() { 
    
const logout=()=>{
    localStorage.removeItem("token");
     window.location="/";
}


function Students(){
    return (
      <>
          <h1>Students</h1>
          <Student user= "student" />
      </>
    );
}
function Staff(){
    return ( 
       
        <Student user= "staff"/>
    );
}




  return ( 
<>

<div class="admin">

    <div class="navbar"> 
        <h1>Admin</h1> 

        <div class="links">

            <NavLink  to="/admin/home">Home</NavLink>
            <NavLink  to="/admin/staff">Staff</NavLink>
            <NavLink  to="/admin/students">Students</NavLink>
            <NavLink   to="/admin/profile">Profile</NavLink>
            <button onClick={logout} >Log Out</button>
        </div>

    </div>
</div>
<Routes>
<Route path="/" element={<Navigate to="/admin/home"/>} />
 
  <Route path='/home' element={<Home/>}/>
  <Route path='/students' element={<Students/>}/>
  <Route path='/staff' element={<Staff/>}/>
  <Route path='/profile' element={<Profile/>}/>
  <Route path='/admin/*' element={<h1>Error</h1>}/>


    </Routes>

    </>
  )
}

export default Admin