const express = require("express");
const axios = require("axios");

const app = express();

//get tags from client
const paramsObj = { tag: "tech", sortBy: "reads", direction: "desc" };

// Root route
app.get("/", (req, res, next) => {
  // console.log("accessing root")
  res.send("There is nothing here. Try /api/ping or /api/posts");
});

// Route 1 - ping
app.get("/api/ping", (req, res, next) => {
  console.log("ping route accessed");
  res.status(200).json({ success: true });
});

// Route 2 - get posts
app.get("/api/posts", (req, res, next) => {
  console.log("post route accessed");
  axios
    .get(`https://api.hatchways.io/assessment/blog/posts`, {
      params: paramsObj
    })
    .then((data) => res.send(data.data.posts))
    //need to send the data to the browser. Why can I log it and not send it to the browser?
    .catch((err) => res.send(err));
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
