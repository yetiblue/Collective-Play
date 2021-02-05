const express = require("express");
const app = express();
app.use(express.static("public"));

app.get(`/`, function (req, res) {
  res.redirect("./public/index.html");
});

app.listen(4000);
console.log("Server starting on port 4000");
