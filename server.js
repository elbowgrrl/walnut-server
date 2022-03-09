const express = require("express");
const axios = require("axios");

const app = express();

const paramsObj = {
  tag: "tech",
  params: { sortBy: "reads", direction: "desc" },
};

//get tags and sorting values from client
const tags = ["tech", "history"];
const sortBy = "reads";
const direction = "desc";

// this function takes in an array of strings and returns an array of serialized url strings
const serializedURL = function (tagsArray) {
  console.log("tagsArray.length", tagsArray.length)
  if (tagsArray.length !== 0) {
    const urlArray = [];
    for (tag of tagsArray) {
      urlArray.push(
        `https://api.hatchways.io/assessment/solution/posts?tags=${tag}`
      );
    }
    return urlArray;
  }
    return null;
};

// Root route
app.get("/", (req, res, next) => {
  console.log("Root route accessed")
  res.send("There is nothing here. Try /api/ping or /api/posts");
});

// Route 1 - ping
app.get("/api/ping", (req, res, next) => {
  console.log("ping route accessed");
  res.status(200).json({ success: true });
});

// Route 2 - get posts
app.get("/api/posts", (req, res, next) => {
  //stores an array of valid urls, each with a single tag
  const validSerializedURLs = serializedURL(tags);

  console.log("post route accessed with " + validSerializedURLs);

//   // if validSerializedURLs is null, use res.send to deliver relevant error message
//   if (!validSerializedURLs) {
//     res.status(400).json({ error: "Tags parameter is required" });
//   }
  
//   //to use axios.all, an array of axios.get() requests needs to be used.
//   //it appears that axios.all is depreciated. Use Promise.all instead: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
 
//   axios.all(validSerializedURLs).then(axios.spread({...responses}))
//   .catch((err) => res.send(err));
// }
  
  // make multiple API calls, one for each tag. All should include properly serialized params
  axios
    .get(`https://api.hatchways.io/assessment/blog/posts`, {
      params: paramsObj,
    })
    // aggregate data from multiple API calls
    // sort data based on provided values
    // remove duplicate data
    // send to browser

    // sends data to browser
    .then((data) => res.send(data.data.posts))
    .catch((err) => res.send(err));
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
