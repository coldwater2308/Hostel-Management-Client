import React, { useEffect, useState } from 'react' 
import "./complaints.css"
import { Backdrop, Button, Card, CardActions, CardContent, CardMedia, Fade, IconButton, Modal, Snackbar, StepButton, tableBodyClasses, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from 'axios';
import { Add, NotListedLocationOutlined } from '@material-ui/icons'; 
import "./complaintModel.css"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useContext } from 'react';
import { userContext, usernameContext } from '../../../../../../App';
export default function ComplaintsPage() {  
  const [user]= useContext(userContext)
  const [loggedUserName]= useContext(usernameContext) 

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
const getComplaints = async()=>{


try { 
    const c= await axios.get('/api/complaint/complaints');
    if(c&&c.data.message=="Success"){
        setcomplaint(c.data.data);
        console.log(c.data.data);
    }
  
    
} catch (error) {
   console.log(error) ;
}


}  
async function handleDelete (id){
  try {
    const del= await axios.delete("/api/complaint/delete/"+id.toString())
    if(del&&del.data.message==="Success"){
      alert("Successfully Deleted")
      getComplaints();
    }
   
    
  } catch (error) {
    console.log(error)
  }
} 
function handleAdd(){ 
  setOpen(true)
  setbody("")
  settitle("")
  setbody("") 
  settype("room")
}
function handleEdit(id,type,title,body){ 
  setid(id);
  handleOpen();
  settype(type); 
  setIsUpdate(true)
  setbody(body);
  settitle(title);
  
}
useEffect(async() => {
   await getComplaints();
}, [])

const handleMenu = (event) => {
  settype(event.target.value);
};

async function handleSubmit(){
 console.log(body)
    try {
       
      
      const complaint = isUpdate===false? await axios.post('/api/complaint/create',{

     userId : loggedUserName,
     type: type,
     cbody:body,
     title:title



        }
        ) : await axios.patch("/api/complaint/update/"+id.toString(),{
          userId : loggedUserName,
          type: type,
          body:body,
          title:title
        }
        )
        if(complaint){
            console.log("success "+ complaint.data.data ); 
            await getComplaints();
            handleClose();
        }
        
    } catch (error) {
        console.log(error)
    }


}


 const [id, setid] = useState("")
 const [type, settype] = useState(undefined)
 const [title, settitle] = useState("")
 const [body, setbody] = useState("")
 const [complaint, setcomplaint] = useState([]);
 const [open, setOpen] = useState(false);
 const handleOpen = () => setOpen(true);
 const handleClose = () => setOpen(false); 
 const [isUpdate , setIsUpdate]= useState(false)
  return (
    <div>
    <h1>Complaints</h1>
    <div class="complaint-container"> 
      

   <div class="complaints"> 


{complaint.map((value,key)=> (

<div key = {value._id} className='complaint'>
  <Card  className = "complaint-card" sx={{ maxWidth: 800 }}>
    <h4 className='type'>Type : {value.type}</h4>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        {value.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {value.complainBody}
        </Typography>
      </CardContent>
     {user!="staff" &&loggedUserName===value.userId?  
      <CardActions>
       
        <Button size="small" onClick={()=>{ handleEdit(value._id,value.type, value.title,value.complainBody);}}>Edit</Button>
        <Button size="small" onClick={()=>handleDelete(value._id)}>Delete</Button> 

      </CardActions> :null}
    </Card>
</div>


))}










   {user!="staff"? <IconButton >
    <Button
    className="add-complaint" onClick={()=>handleAdd()}> <Add/>
    </Button>
   
    {/* <button </button>  */}
    </IconButton> :null}
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
          <h1>Add a Complaint</h1>
   <div class="create-container">


<div class="create-complaints"> 
<Box sx={{ minWidth: 100 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={type}
          label="Age"
          onChange={handleMenu}
        >
          <MenuItem value="room">Room</MenuItem>
          <MenuItem value="mess">Mess</MenuItem>
          <MenuItem value="staff">Staff</MenuItem>
        </Select>
      </FormControl>
    </Box>

<input type="text"  name="title" placeholder="Title" class="text" value={title} id="complaint-title" onChange={(value)=>settitle(value.target.value)}></input> 
<textarea type="text" name="complaint" id="complaint-body" value={body} placeholder="Complaint" class="text area" onChange={(value)=>setbody(value.target.value)}></textarea>

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
