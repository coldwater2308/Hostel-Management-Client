import { CircularProgress } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {  useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import {Button,MenuItem,Select} from '@mui/material';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal'; 
import TextField from "@mui/material/TextField"
import './hostels.css'
function Hostels() {   
 const params =useParams();
   const navigate = useNavigate(); 
   
const style = {
        position: 'absolute' ,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      }; 
      const handleAdd=()=>handleOpen();
      const [open, setOpen] = useState(false);
      const handleOpen = () => setOpen(true);
      const handleClose = () => setOpen(false);
        let name =[];
    const [x, setx] = useState([])
    const token = localStorage.getItem("token");
        async function hostelapi(){ 
         
            
         
          try { 
    
            const result = await axios.get('/api/hostel/',{headers: {
                "Content-type" : "application/json" ,
                "x-access-token": token
            }}); 
            if(result.data.message=="Success"){
               
              console.log(result.data.data)
              for(let i=0;i<result.data.data.length;i++){
                  name.push(result.data.data[i]);
               
              }
              setx(name);  
                 
                console.log(name);
                
            
            }
            
            else 
            console.log(result.data.message);
              
          } catch (error) {
              console.log(error);
          }
    
    
        }
    
    useEffect(() => { 
      let isMounted = true;   
    hostelapi();  
    
    return () => { isMounted = false };
    },[token]) 


    
  return ( 




    <div class="hostel-list">


{ (x.length==0)?<CircularProgress/> :  x.map((value,index)=> 
            <div class="hostel" >


    <div class="child" onClick={()=>navigate('/admin/hostel/'+params.gender +'/' + value.name )}>
    { index + " " +value.name}    
    </div>


    

        
</div> 
) 



}  
<div class="hostel">



{/* <Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
    <Typography id="modal-modal-title" variant="h3" component="h2">
      Add a Hostel
    </Typography>
    <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={type}
          label="Type"
          onChange={handleMenu}
        >
          <MenuItem value="Single">Single</MenuItem>
          <MenuItem value="Double">Double</MenuItem>
          <MenuItem value="Triple">Triple</MenuItem>
        </Select>
    <TextField 
                onChange={handleChange}
                style={{"margin":"10px","width":"100%"}}
          required
          id="outlined-required"
          label="Name" 
          type="text"
          name="Name" 
          
        /> 
                        <TextField 
                onChange={handleChange}
                style={{"margin":"10px","width":"100%"}}
          required
          id="outlined-required"
          label="No Of Floors" 
          type="text"
          name="No Of Floors" 
          
        /> 
                        <TextField 
                onChange={handleChange}
                style={{"margin":"10px","width":"100%"}}
          required
          id="outlined-required"
          label="Room Per Floor" 
          type="text"
          name="Room Per Floor" 
          
        />  
        <Button onClick={handleSubmit}>Submit</Button>
        

  </Box>
</Modal>
 */}



        
</div>






    </div>

  )} 
  export default Hostels