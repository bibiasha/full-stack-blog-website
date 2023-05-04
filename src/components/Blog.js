import React from 'react'
import { Card, Box, CardHeader, Avatar, CardMedia, CardContent, Typography, IconButton } from '@mui/material'
import { red } from '@mui/material/colors'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Blog({ title, description, imageURl, userName, isUser, id }) {
    const navigate = useNavigate();

    const handleEdit = (ID) => {
        console.log(ID)
        navigate(`/myBlogs/${ID}`)
    }

    const deleteRequest = async () =>{
        const response= await axios.delete(`http://localhost:5000/api/blog/${id}`).catch(err=> console.log(err))
        const data= await response.data;
        return data;
      }

    const handleDelete = (e) => {
        deleteRequest().then(()=>navigate("/")).then(()=>navigate("/blogs"))
    }

    return (
        <div>
            {" "}
            <Card
                sx={{
                    width: '40%',
                    margin: 'auto',
                    mt: 2,
                    padding: 2,
                    boxShadow: "5px 5px 10px #ccc ", ":hover:": {
                        boxShadow: "10px 10px 20px #ccc "
                    }
                }}>
                {isUser && (
                    <Box display='flex'>
                        <IconButton onClick={()=>handleEdit(id)} sx={{ marginLeft: 'auto', }}><EditIcon color='warning'/></IconButton>
                        <IconButton onClick={handleDelete}><DeleteIcon color='error'/></IconButton>
                    </Box>
                )}
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            {userName}
                        </Avatar>
                    }

                    title={title}
                    subheader="September 14, 2016"
                />
                <CardMedia
                    component="img"
                    height="194"
                    image={imageURl}
                    alt="Paella dish"
                />
                
                <CardContent>
                <hr/>
                <br />
                    <Typography variant="body2" color="text.secondary">
                        <b>{userName}</b>{": "} {description}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default Blog
