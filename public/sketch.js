// Open and connect socket

let socket = io.connect("http://localhost:4000/");
let woodCount = 0;
let woodChuck =
  "How Much Wood Would a Woodchuck Chuck if a Woodchuck Could Chuck Wood?";
// Listen for when the socket connects
socket.on("connect", function () {
  // Log a success message
  console.log("HEY I'VE CONNECTED");
});

function setup() {
  createCanvas(400, 400);

  // Listen for data coming from the server
  socket.on("data", function (data) {
    // everything back from the server is just {key: value} the
    // data defined here is the prefix object to apply to that object from server

    // console.log(data.response, "client side");
    // Draw a circle at the mouseX position
    window.alert(
      "A woodchuck would chuck" +
        " " +
        data.data.count +
        " " +
        "wood" +
        " " +
        data.response
    );
  });
}

function draw() {
  //background(220);
}
document.getElementById("button").addEventListener("click", function () {
  woodCount++;
  console.log(woodCount, "woodCount");
  sendWood();
});
function sendWood() {
  // Send data to the server
  socket.emit("data", { count: woodCount, question: woodChuck });
}
