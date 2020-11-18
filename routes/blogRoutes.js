import express from "express";
import { blog_create_get, blog_create_post, blog_delete, blog_details, blog_index } from "../controllers/blogController.js";

const blogRouter = express.Router();

// Blog routes
blogRouter.get("/", blog_index);

blogRouter.post("/", blog_create_post);

blogRouter.get("/create", blog_create_get);

blogRouter.get("/:id", blog_details);

blogRouter.delete("/:id", blog_delete);

export default blogRouter;