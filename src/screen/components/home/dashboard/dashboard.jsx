import React, { useEffect, useState } from "react";


import { Link, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import User from "./User/user";

import Hostels from "./Hostels/hostels"; 
import axios from "axios";
import { CircularProgress } from "@mui/material";
import Fees from "./leaves/leave";
import Complaints from "./Complaints/complaints";
import Students from "./Students/Students";

import MyRoom from "./MyRoom";
import { useContext } from "react";
import { userContext } from "../../../../App";
import Staff from "./Staff";
function Dashboard (){
    const [user] = useContext(userContext)
    console.log("userType :"+user)
return( 
    <div>
<Routes>

<Route path="/" element={<Navigate to={user==="student"?"myroom":"/hostel"} />} />

<Route
        path="/hostel/*"
        element={<Hostels/>}
    /> 
    <Route
        path="/myroom/*"
        element={<MyRoom/>}
    /> 
    <Route
        path="/fees/*"
        element={<Fees/>}
    /> 
        <Route
        path="/staff/*"
        element={<Staff/>}
    /> 
    <Route
        path="/users/*"
        element={<User/>}
    /> 
        <Route
        path="/students/*"
        element={<Students user="student"/>}
    /> 
       <Route
        path="/complaints/*"
        element={<Complaints/>}
    /> 
           <Route
        path="*"
        element={<h1>Error</h1>}
    /> 
    





</Routes>
</div>


);

}
// }  

// function Students(){ 
//     const [student, setstudent] = useState([]); 
//     var x =[];
//     useEffect(async() => {
//         try {
//             const students = await axios.get('/api/student');
//             if(students){ 
              

//                 setstudent(students.data.data);
//             }
//         } catch (error) {
//             console.log(error)
//         }
//     }, []);  
//     // var ss= student.map((value)=><h1>{value.name}</h1>);
// console.log( student);
    

//     return (

//         <div>

// {/* {ss} */}

// {student.length==0 ? <CircularProgress/> : student.map((value,index)=> <h1 key = {index}>{value.name}</h1>)}
//         </div>


//     );



// }



export default Dashboard; 



