const express = require("express");
const axios = require('axios');

const app = express();

// Root route
app.get("/", (req, res, next) => {
  // console.log("accessing root")
  res.send("This is the root")
});

// Route 1 - ping
app.get("/api/ping", (req, res, next) => {
  console.log("ping route accessed")
  res.status(200).json({ "success": true})
});

// Route 2 - get posts
app.get("/api/posts", (req, res, next) => {
const tags = "tech"
console.log("post route accessed")
axios.get(`https://api.hatchways.io/assessment/blog/posts?tag=tech`, { tags: tags })
.then(data => console.log(data.data.posts))
//need to send the data to the browser
.catch(err => res.send(err))
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
 });

