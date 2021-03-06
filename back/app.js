const express = require('express');
const bodyParser = require('body-parser');

require('dotenv').config();

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const commentRoutes= require("./routes/comments")
const likeRoutes= require("./routes/likes")
const path = require("path");

const app = express();

app.use((req, res, next) => {
   res.setHeader("Access-Control-Allow-Origin", "*");
   res.setHeader(
     "Access-Control-Allow-Headers",
     "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
   );
   res.setHeader(
     "Access-Control-Allow-Methods",
     "GET, POST, PUT, DELETE, PATCH, OPTIONS"
   );
   next();
 });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/post", commentRoutes);
app.use("/api/post", likeRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;