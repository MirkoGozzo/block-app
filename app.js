const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");
const port = process.env.PORT || 4001;
const index = require("./routes/index");
const app = express();
app.use(index);
const server = http.createServer(app);
const io = socketIo(server);
io.on("connection", socket => {
  console.log("New client connected"), setInterval(
    () => getApiAndEmit(socket),
    10000
  );
  socket.on("disconnect", () => console.log("Client disconnected"));
});
const getApiAndEmit = async socket => {
  try {
    let [res, temp] = await Promise.all([
      axios.get("https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH&tsyms=USD,EUR"),
      axios.get("https://api.darksky.net/forecast/10425b50a8f1f55e537cd7cafd78078e/45.8355209,9.0290169"),
    ])

    socket.send(console.log(res.data));
    res.data.temperature = temp.data.currently.temperature;
    socket.send(console.log(temp.data.currently.temperature));
    socket.send(console.log(res.data));
    socket.emit("FromAPI", res.data);
  } catch (error) {
    console.error(`Error: ${error.code}`);
  }
};
server.listen(port, () => console.log(`Listening on port ${port}`));
