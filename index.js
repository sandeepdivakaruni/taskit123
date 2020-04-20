const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const port = 3000;
app.use(bodyParser.urlencoded({ extended: false }));

//let name = document.querySelector(".name");
//app.use(express.static("public"));
app.get("/", function (req, res) {
  res.sendFile("index.html", { root: __dirname });
});
app.post("/submit", (request, response) => {
  let name = request.body.textField;
  let api =
    "https://api.unsplash.com/search/users?client_id=AqjTBU-nlph4t1Wc-5cE-nqxtH8gptGyhKjEADR8VHQ&query=" +
    name;

  fetch(api)
    .then((res) => res.json())
    .then((json) => {
      let userName = json.results[0].first_name;
      let bio = json.results[0].bio;
      let location = json.results[0].location;
      let instaGramUsername = json.results[0].instagram_username;
      let totalLikes = json.results[0].total_likes;
      console.log(json.results[0]);
      objectIt = {
        user: userName,
        bio: bio,
        location: location,
        insta_id: instaGramUsername,
        total_likes: totalLikes,
      };
      console.log(name);
      response.send(objectIt);
    });
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
