import axios from 'axios';
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ComplaintsPage from './complaintsPage/ComplaintsPage';

export default function Complaints() {  




    function ComplaintPage(){


        return (
            <div>

                Particular Complaint
            </div>
        );
    }
    
  return (
    <div >
    
    <Routes>

    <Route path="/" element={<ComplaintsPage/>} />
    <Route path="/:complaintId" element={<ComplaintPage/>} />



    </Routes>
    
    
    </div> 


   
  )
}
