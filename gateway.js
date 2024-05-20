const http = require("http");
const cors = require("cors");
const express = require("express");

const router = require("./routes/router");

const PORT = process.env.PORT || 3000;

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

app.all("/*", router);

const server = http.createServer(app);

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at: ", promise, "reason: ", reason);
});

server.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
