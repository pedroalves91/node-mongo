import Blog from "../models/blog.js";

export const blog_index = (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render("index", { title: "Blogs", blogs: result});
        })
        .catch((err) => {
            console.log(err);
        });
};

export const blog_details = (req, res) => {
    const id = req.params.id;

    Blog.findById(id)
        .then((result) => {
            res.render("details", { blog: result, title: result.title });
        })
        .catch((err) => {
            console.log(err);
            res.status(404).render("404", { title: "Blog not found" });
        });
};

export const blog_create_get = async (req, res) => {
    res.render("create", { title: "Create a new blog" });
};

export const blog_create_post = async (req, res) => {
    const blog = new Blog(req.body);

    blog.save()
        .then((result) => {
            res.redirect("/blogs");
        })
        .catch((err) => {
            console.log(err);
        });
};

export const blog_delete = async (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
        .then((result) => {
            res.json({ redirect: "/blogs" });
        })
        .catch((err) => {
            console.log(err);
        });
};