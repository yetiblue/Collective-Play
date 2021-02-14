const express = require("express");
const app = express();
app.use(express.static("public"));

app.get(`/`, function (req, res) {
  res.redirect("./public/index.html");
});

let server = app.listen(4000);
console.log("Server starting on port 4000");

let io = require("socket.io")(server);

// app.get(`/`, function (req, res) {
//   res.redirect("./public/index.html");
// });
io.on(
  "connection",
  // Callback function on connection
  // Comes back with a socket object
  function (socket) {
    console.log("HELLO", socket.id);

    // This connected socket listens for incoming messages called 'data'
    socket.on("data", function (data) {
      // Log the data that came in
      console.log(data.count, "data count");
      var response = "";
      if (data.count <= 2) {
        response = "This woodchuck is a slow 'un";
        console.log(response, "response");
      } else if (data.count > 2 && data.count < 10) {
        response = "This is a fast woodchuck!";
        console.log(response, "response");
      }

      // Send it back out to everyone
      io.emit("data", { data: data, response: response });
    });
  }
);
