import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Button, InputLabel, TextField, Typography } from '@mui/material'

const labelStyles= {mb:1, mt:2, fontSize:'24px', fontWeight:'bold' }
function BlogDetail() {
  const navigate = useNavigate();
  const [findBlog, setFindBlog]= useState({});
  const id= useParams().id;
  //console.log(id)
  const [inputs, setInputs] = useState({});

  const handleChange = (e) => {
    setInputs((previousState) => ({
      ...previousState,
      [e.target.name]: e.target.value
    }))
  }

  const fetchDetails = async () =>{
    const response= await axios.get(`http://localhost:5000/api/blog/${id}`).catch(err=> console.log(err))
    const data= await response.data;
     console.log("data",response.data);
    return data;
  
  }
 
  useEffect(()=>{
    fetchDetails().then(data =>{
      setFindBlog(data.findBlog)
       setInputs({title:data.findBlog.title,description:data.findBlog.description})
    })
  },[id])
  console.log("blog=====>",findBlog)

  const sendRequest = async () =>{
    const response= await axios.put(`http://localhost:5000/api/blog/edit/${id}`,{
      title: inputs.title,
      description:inputs.description
    }).catch(err=> console.log(err))
    const data= await response.data;
    return data;
  }

  const handleSubmit =(e)=>{
  e.preventDefault();
    console.log(inputs)
    sendRequest().then(data=>console.log(data)).then(()=>navigate("/myBlogs"))
  }
  return <div>
      {inputs &&
       <form onSubmit={handleSubmit}>
        <Box 
        border={5} 
        borderColor="blue" 
        borderRadius={10} 
        boxShadow="10px 10px 20px #ccc" 
        padding={3} 
        margin={3} 
        marginTop={3}
        display='flex' 
        flexDirection='column' 
        width={'80%'}
        // alignContent={'center'}
        // justifyContent={'center'}
        >
           <Typography 
           fontWeight={'bold'} 
           padding={3} 
           color='blue' 
           variant='h2'
           textAlign={'center'}
           >Post your Blog</Typography>
           <InputLabel sx={{labelStyles }}>Title</InputLabel>
           
           <TextField 
           name='title' 
           onChange={handleChange} 
           value={inputs.title} 
           margin='normal' 
           variant='outlined'/>
           
           <InputLabel sx={{labelStyles }}>Description</InputLabel>
          
           <TextField 
           name='description' 
           onChange={handleChange} 
           value={inputs.description} 
           margin='normal' 
           variant='outlined'/>
           
        <Button sx={{mt:2, borderRadius:4}} variant='contained' color='warning' type='submit'>Submit</Button>
        </Box>
      </form>}
    </div>
  
}

export default BlogDetail
