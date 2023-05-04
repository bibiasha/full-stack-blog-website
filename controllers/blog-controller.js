import Blog from "../model/Blog";
import User from "../model/User";
import mongoose from "mongoose";

export const getBlogs = async (req, res, next) => {
    let blogs;
    try {
        blogs = await Blog.find().populate("user");
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
    if (!blogs) {
        return res.status(404).json({ status: false, message: "No blog found" });
    }
    return res.status(200).json({ status: true, blogs })
}

export const createBlog = async (req, res, next) => {
    const { title, description, image, user } = req.body;
    let existingUser;
    try{
        existingUser= await User.findById(user)
    }catch(error){
        return res.status(500).json({ status: false, message: error.message });
    }
    if(!existingUser){
        return res.status(404).json({ status: false, message: "No User found" });
    }
    const blog = new Blog({
        title,
        description,
        image,
        user
    });
    try {
       const session =await mongoose.startSession();
       session.startTransaction();
       await blog.save({session});
       existingUser.blogs.push(blog)
       await existingUser.save({session});
       await session.commitTransaction()
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
    
    return res.status(200).json({ blog })

}

export const editBlog = async (req, res, next) => {
    const { title, description } = req.body
    const blogId = req.params.id;
    let blog;
    try {
        blog = await Blog.findByIdAndUpdate(blogId, {
            title,
            description
        })
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
    if (!blog) {
        {
            return res.status(400).json({ status: false, message: "Unable to update the blog" })
        }
    }
    return res.status(200).json({ blog })
}

export const getBlogsById = async (req, res, next) => {
    const blogId = req.params.id;
    let findBlog;
    try {
        findBlog = await Blog.findById(blogId)
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
    if (!findBlog) {
        {
            return res.status(404).json({ status: false, message: "Blog doesn't exist" })
        }
    }
    return res.status(200).json({ findBlog })
}

export const deleteBlogsById = async (req, res, next) => {
    const blogId = req.params.id;
    let blog;
    try {
        blog = await Blog.findByIdAndDelete(blogId).populate('user');
    if (!blog) {
        {
            return res.status(404).json({ status: false, message: "Blog doesn't exist" })
        }
    }
        await blog.user.blogs.pull(blog)
        await blog.user.save();
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
   
    return res.status(200).json({ status:true, message:"Sucessfully deleted blog" })
}

export const getBlogsByUserId = async (req, res,next)=>{
    const userId = req.params.id;
    let userBlog;
    try{
        userBlog= await User.findById(userId).populate("blogs")
    }catch(error){
        return res.status(500).json({ status: false, message: error.message });
    }
    if(!userBlog){
        return res.status(404).json({ status:false, message:"No blog found" })
    }
    return res.status(200).json({ status:true, user:userBlog })
}