import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import './user.css'
// import Backdrop from '@mui/material/Backdrop';
// import Box from '@mui/material/Box';
// import Modal from '@mui/material/Modal';
// import Fade from '@mui/material/Fade';

// import Typography from '@mui/material/Typography';
import { Backdrop, Button, Fade, Modal, Snackbar, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";


function UserDetails(){  
  
   const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'white',
      border: '2px solid #000',
      boxShadow: 24, 
      p: 4,
    };  




    const allotStudent = async( studentId)=>{
      const token = localStorage.getItem("token");
      try {   
          var rno;
          var capacity=3;
          var hname;
          var flag=0;
          const data= await axios.get('/api/hostel/', {headers: {
            "Content-type" : "application/json" ,
            "x-access-token": token
        }});
         
           
      if(data){ 
      const hostels = data.data.data;
      for(let i=0;i<hostels.length;i++){
      
         var rooms = hostels[i].rooms;
         for(let j=0;j<rooms.length;j++){
             if(rooms[j].students.length<capacity) {
                 flag=1;
                 rno=rooms[j].no;
                 hname = hostels[i].name; 
                 break;
             } 
             
         } 
         if(flag==1)
         break;
      
      
      
      }
      
      
      
      
      
      
      
      if(flag==0){
          // no roooms available  
          console.log("No rooms available")
      }else {
         console.log("Room : "+ rno+ " , hostel " + hname);
      
      const allot = await axios.patch('/api/hostel/allot',
      
      
      {name : hname,room:rno,studentId:studentId}
      ,{headers: {
         "Content-type" : "application/json" ,
         "x-access-token": token
     }}
  );
      if(allot.result = "success"){
      sethostel(hname);
      setroom(rno) 
      console.log("Room : "+ room+ " , hostel " + hostel);
      }
      
      
      
      }
      
      }else {
          //error finding 
          console.log("Failed")
      }
      
      } catch (error) {
          console.log(error);
      }
      
      
      
      
      }


const getRoomDetails = async()=>{ 

try {
    
 const token = localStorage.getItem("token"); 


const getRoom = await axios.get('/api/hostel/roomInfo/119cs0039',{headers: {
   "Content-type" : "application/json" ,
   "x-access-token": token
}}) 
    if(getRoom && getRoom.data.message=="Success"){ 
       console.log(getRoom.data.data);
       sethostel(getRoom.data.data.name);
       setroom(getRoom.data.data.rooms[0].no)
    }






 
    
     

     
     else {
        console.log("Error Occured")
     }


} catch (error) {
  console.log(error) 
}
}

useEffect(async () => { 

   await getRoomDetails(); 
   
}, [])

const [hostel, sethostel] = useState("");
const [room, setroom] = useState("");
    const [name, setname] = useState("Shubham Maurya")
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  

const navigate =useNavigate();

    return ( 





<div>





<div class="profile">
<div class="profile-card">

<img src="https://scontent.fvns1-2.fna.fbcdn.net/v/t39.30808-6/266457534_3141079842802175_7544265058666688218_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=Jpdr1K7QEOQAX_J4Qfs&_nc_ht=scontent.fvns1-2.fna&oh=00_AT_z9v-PnZDtQ7AKAt8HxPQngO5-ASu2eM3nixPw0lTxXw&oe=623C7D87" />
<table>
    <tr>
        <td>Id</td>
        <td>119CS0034</td>
    </tr>

<tr>
    <td>Name</td>
    <td>Shubham Maurya</td>
</tr>
<tr>
    <td> Father Name</td>
    <td>Subhash maurya</td>
</tr>
<tr>
    <td>Mother Name</td>
    <td>Nirmala Devi maurya</td>
    
</tr>

<tr>
    <td>Address</td>
    <td>Chhatnag Road Jhunsi Allahabad</td>
</tr>
<tr>
    <td>Phone</td>
    <td>6393530213</td>
</tr>
<tr>
    <td>Email</td>
    <td>maurya.shubham.23@gmail.com</td>
</tr>

</table>

 <Button onClick={handleOpen}>Edit</Button>

</div>







    </div> 


  



<Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
      //   onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      > 
        <Fade in={open}> 
        <div >
          <Box sx={style}>
          <TextField 
              onChange={(e)=>setname(e.target.value)}
             helperText="Please enter your name"
             id="demo-helper-text-misaligned"
             label="Name" 
             value={name}
            /> 
           <TextField
             
             id="demo-helper-text-misaligned"
             label="Father Name"
            />
             <TextField
             
             id="demo-helper-text-misaligned"
             label="Mother Name"
            />
             <TextField
             
             id="demo-helper-text-misaligned"
             label="Address"
            />
              <TextField
             
             id="demo-helper-text-misaligned"
             label="Email"
            />
              <TextField
           
             id="demo-helper-text-misaligned"
             label="Phone" 
             

            />  
            <Button onClick={handleClose}>Submit</Button>
            

          </Box> 
          </div>
        </Fade>
      </Modal>








                           
                            
                            




<div class="room-footer">


<footer>
<table>
<tr>

  <td className="footer">
      Room no : {room}
  </td> 

  <td className="footer">

      Hostel Name : {hostel}

  </td> 
  <td className="footer">
      <button onClick={async()=>allotStudent("119cs0016")}>
          Allot/Reallot
      </button>

  </td>


</tr>


</table>

</footer>


</div> 
  </div> 

  
 
    );
} 
export default UserDetails;