import React, { useEffect, useState } from 'react' 
import "./leave.css"
import { Backdrop, Button, Card, CardActions, CardContent, CardMedia, Fade, IconButton, Modal, Snackbar, StepButton, tableBodyClasses, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from 'axios';
import { Add } from '@material-ui/icons'; 
import "./leavemodel.css"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';


import Select from '@mui/material/Select';
import { useContext } from 'react';
import { userContext, usernameContext } from '../../../../../App';
export default function Leave() {  
    const [user]=useContext(userContext) 
    const [username]=useContext(usernameContext);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        bgcolor: 'white',
        border: '2px solid #000',
        boxShadow: 24, 
        p: 4,
      };   
const getleave = async()=>{


try { 
    const c=  
    user ==="staff" ? await axios.get('/api/leave/leaveRequests') : await axios.get('/api/leave/leaves/'+username)
    if(c&&c.data.message=="Success"){
        setleave(c.data.data);
        console.log(c.data.data);
    }
  
    
} catch (error) {
   console.log(error) ;
}


}
useEffect(async() => {
   await getleave();
}, [])

const handleMenu = (event) => {
  settype(event.target.value);
}; 
const handleAccept = async(id)=>{
  try { 
    const status=await user==="staff"?axios.patch('api/leave/markStatus'+id,{status:"accept"}):handleOpen()
    if(user==="staff"&&status&&(await status).data.message==="Success")
    { 
      getleave();

    }
  } catch (error) {
    console.log(error)
  }
}
const handleReject = async(id)=>{
  try { 
    const status=await user==="staff"?axios.patch('api/leave/markStatus'+id,{status:"reject"}):axios.delete('/api/leave/delete/'+id)
    if(status&&status.data.message==="Success")
    { 
      getleave();

    }
  } catch (error) {
    console.log(error)
  }
}

async function handleSubmit(){
 console.log(body)
    try {
        const complaint = await axios.post('/api/leave/create',{

     userId : username,
     type: type,
     reason:body,
     title:title,
  



        }
        )
        if(complaint){
            console.log("success "+ complaint.data.data ); 
            await getleave();
            handleClose();
        }
        
    } catch (error) {
        console.log(error)
    }


}


 
 const [type, settype] = useState(undefined)
 const [title, settitle] = useState("")
 const [body, setbody] = useState("")
 const [leave, setleave] = useState([]);
 const [open, setOpen] = useState(false);
 const handleOpen = () => setOpen(true);
 const handleClose = () => setOpen(false);
 const [out, setOut] = useState(undefined);
 const [inn, setInn] = useState(undefined);
  return (
    <div>
    <h1>Leaves</h1>
    <div class="complaint-container"> 
      

   <div class="leave"> 


{leave.map((value,key)=> (

<div key = {value._id} className='complaint'>
  <Card  className = "complaint-card" sx={{ minWidth: 800 }}>
    <h4 className='type'>Type : {value.type}</h4>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        {value.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {value.complainBody}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={()=>handleAccept(value._id)}>{user==="staff"?"Approve" : "Edit"}</Button>
        <Button size="small" onClick={()=>handleReject(value._id)}>{user==="staff"?"Reject" : "Delete"}</Button>
      </CardActions>
    </Card>
</div>


))}










  {user!="staff"?  <IconButton >
   <Button
    className="add-complaint" onClick={handleOpen}> <Add/>
    </Button>
   
    {/* <button </button>  */}
    </IconButton> : null }
    <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      > 
        <Fade in={open}> 
        <div >
          <Box sx={style}>
          <h1>Request for a Leave</h1>
   <div class="create-container">


<div class="create-leave"> 
<Box sx={{ minWidth: 100 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={type}
          label="type"
          onChange={handleMenu}
        >
          <MenuItem value="day">Day</MenuItem>
          <MenuItem value="week">Week</MenuItem>
          <MenuItem value="month">Month</MenuItem>
        </Select>
      </FormControl>
    </Box>

<input type="text"  name="title" placeholder="Title" class="text" id="leave-title" onChange={(value)=>settitle(value.target.value)}></input> 
<textarea type="text" name="complaint" id="leave-body"  placeholder="Reason and details" class="text area" onChange={(value)=>setbody(value.target.value)}></textarea>
{/* 
        <label for="out-time">Out Time:</label>
<input type="datetime-local" id="out-time" name='out-time' value={out} onChange={(value)=>setOut(value)}></input>
<label for="in-time">In Time:</label>
<input type="datetime-local" id="in-time" name='in-time' value={inn} onChange={(value)=>setInn(value)}></input> */}
               
{/* <input type="file"  class="" id="complaint-inmageimages"></input> */}



<button onClick={handleSubmit} class="submit" > Submit</button>
</div>




   </div>

   
            

            

          </Box> 
          </div>
        </Fade>
      </Modal>
</div>
   </div>


</div>  
  )
}
