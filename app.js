import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import blogRouter from "./routes/blogRoutes.js";

//const Blog = require("./models/blog");

const app = express();
const PORT = 3000;

// connect to mongodb
const dbURI = process.env.MONGO_URI;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(PORT)) // listen for requests
    .catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// Middleware & static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Routes
app.get("/", (req, res) => {
    res.redirect("/blogs");
});

app.get("/about", (req, res) => {
    //res.send("<p>About page</p>");
    //res.sendFile("./views/about.html", {root: __dirname});
    res.render("about", { title: "About" });
});

// Redirect
app.get("/about-us", (req, res) => {
    res.redirect("/about");
});

// Blog routes
app.use("/blogs", blogRouter);

// 404 page always on bottom
app.use((req, res) => {
    //res.status(404).sendFile("./views/404.html", {root: __dirname});
    res.status(404).render("404", { title: 404 });
})