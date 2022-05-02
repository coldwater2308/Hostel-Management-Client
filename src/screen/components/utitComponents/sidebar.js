import React from 'react'
import {  NavLink } from 'react-router-dom';
import './sidebar.css'

import { Add, ClearAllTwoTone, PaymentRounded, People, Person, SingleBedRounded } from '@material-ui/icons';

import { ForumSharp } from '@material-ui/icons';
import { useContext } from 'react';
import { userContext } from '../../../App';

export default function Sidebar() { 
const [user]=useContext(userContext)

  return (

<div className="sidebar"> 



<nav>

<ul>

<li className="list ">
  {user=="staff"?   <NavLink to='/hostel' >
    <div className="icon" style={{display:"block"}}> <SingleBedRounded/> </div> 
    <span className="text ">Hostels</span>
</NavLink> :  <NavLink to='/myroom' >
    <div className="icon" style={{display:"block"}}> <SingleBedRounded/> </div> 
    <span className="text ">My Room</span>
</NavLink>}

</li> 






<li className="list">
   {user=="staff"?<NavLink to='/students' > 
  
        <div className="icon"> <People/>  </div> 
        <span className="text ">Students</span>
    </NavLink> :  <NavLink to='/staff' >
    <div className="icon" style={{display:"block"}}> <People/> </div> 
    <span className="text ">Staff</span>
</NavLink>}
    </li>
    
    <li className="list ">
        <NavLink to='/complaints'>
            <div className="icon"> <ForumSharp/> </div> 
            <span className="text">Complaints</span>
        </NavLink>
        
        </li>

        <li className="list ">
            <NavLink to='/fees'>
                <div className="icon">
                <PaymentRounded/> </div> 
                <span className="text">Leaves</span>
            </NavLink>
            
            </li>
            <li className="list ">
                <NavLink to = '/users'>
                    <div className="icon"><Person/> </div> 
                    <span className="text">User</span>
                </NavLink>
                
                </li>





</ul>











</nav>











</div> 

  );
}
