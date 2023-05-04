import express from 'express';
import { createBlog, getBlogsByUserId, deleteBlogsById, editBlog, getBlogs, getBlogsById } from '../controllers/blog-controller';
const blogRouter = express.Router();

blogRouter.get("/", getBlogs)
blogRouter.post("/add", createBlog)
blogRouter.put("/edit/:id", editBlog)
blogRouter.get("/:id", getBlogsById)
blogRouter.delete("/:id", deleteBlogsById)
blogRouter.get("/user/:id", getBlogsByUserId)

export default blogRouter