
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { userContext } from '../../../../../App';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal'; 
import TextField from "@mui/material/TextField"
import "./students.css"
export default function Students(props) {  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [open, setOpen] = useState(false);
  const [user]= useContext(userContext) 
 const [formData,setFormData]=useState({
   name:"",
   email:"",
   username:"",
   dob:undefined
 })

  const handleChange=(e)=>{
     let fieldname=e.target.name; 
     let fieldvalue=e.target.value;
      if(fieldname==="name")
      setFormData((prev)=>(
        {
          ...prev,
          "name":fieldvalue
        }
      ))
      else if(fieldname==="email")
      setFormData((prev)=>(
        {
          ...prev,
          "email":fieldvalue
        }
      ))
      else if(fieldname==="username")
      setFormData((prev)=>(
        {
          ...prev,
          "username":fieldvalue
        }
      ))
      else if(fieldname==="dob"){
        setFormData((prev)=>(
          {
            ...prev,
            "dob":fieldvalue
          }
        )) 
        console.log(typeof fieldvalue)
      }

  }
const [student, setStudent] = useState([]);
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const onAdd = async()=>{


  
}
const getStudents= async()=>{
  console.log(props.user)
    try { 
        const user = await axios.get("/api/"+props.user+"/");
        if(user){
              console.log(user.data.data)
              setStudent(user.data.data);
              
        }
        
    } catch (error) {
        console.log(error);
    }

} 
const handleSubmit= async(e)=>{  
e.preventDefault();

console.log(formData)
const {name,email,username,dob}=formData;
console.log(dob);
  try {
    const data=await axios.post('/api/user/register',{
      email : email,
      username : username,
      name : name ,
      dob:dob,
      password: dob
    }) 
    if(data&&data.data.message=="Success"){
      
      setOpen(false)
    }
    
  } catch (error) {
    console.log(error) 
    
  }

}

useEffect(() => { 


 getStudents(); 



}, [])




  return ( 
    <div class="students-list"> 



    
    <div class="students">
      <table>
        <thead> 
         
            <tr >
                
               
                <th>Id</th>
                <th>Name</th>
               {props.user!="staff"?<th>Hostel</th>: <th>phone</th>}
               {props.user!="staff"?<th>Room</th>: <th>Email</th>}
               {props.user!="staff"?<th>Status</th>: <th>Address</th>}
               {props.user!="staff"?<th>Action</th>: null}
        
            </tr>
       
        </thead> 
        <tbody>





             {
                student.map(s=>(
                    <tr>

<td>{s._id}</td>
<td>{s.name}</td>
{props.user!="staff"?<td>{s.hostelName}</td>: <td>{s.email}</td>}
{props.user!="staff"?<td>{s.roomNo}</td>: <td>{s.phone}</td>}
{props.user!="staff"?<td>Available</td>: <td>{s.address}</td>}
{props.user!="staff"?<td><Button onClick={()=>{}} class="students-allot">{s.roomNo==="None"?"Allot":"Reallot"}</Button></td>:null}
</tr>
                ))
            } 
           
            
            

          
        </tbody>






      </table>

    </div>
{ user==="admin"? <button onClick={handleOpen}  className='add'>Add {props.user}</button> : null}
<Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add a {props.user}
        </Typography> 
        <form onSubmit={handleSubmit}>
        <TextField style={{"margin":"10px","width":"100%"}} 
        onChange={handleChange}
          required 
          name="email"
          id="outlined-required"
          label="Email" 
          type="email"
       
        />
        <TextField style={{"margin":"10px","width":"100%"}}
          required
          onChange={handleChange}
          id="outlined-required"
          label="Name" 
          type="text"
          name="name"
        
        />
                <TextField 
                onChange={handleChange}
                style={{"margin":"10px","width":"100%"}}
          required
          id="outlined-required"
          label="Id" 
          type="text"
          name="username" 
          
        /> 
                        <TextField 
                        onChange={handleChange}
                        style={{"margin":"10px","width":"100%"}}
                        InputLabelProps={{ shrink: true }} 
          required
          
          label="DOB" 
          type="date"
          name="dob"
          
        />   
       
        <Button type='submit'  style={{"width":"100%"}} >Submit</Button>
</form>
      </Box>
    </Modal>
    </div>
    
  )
}
