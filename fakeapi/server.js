const cors = require("cors");
const http = require("http");
const axios = require("axios");
const express = require("express");

const fakeApi = require("./routes/fake-api");
const PORT = process.env.PORT || 3002;
const HOST = "localhost";

const app = express();

app.use(cors());
app.use(express.json());
app.all("/*", fakeApi);

const server = http.createServer(app);

server.listen(PORT, async (req, res) => {
  const apiInfo = {
    apiName: "registerapi",
    host: HOST,
    port: PORT,
    protocol: "http",
  };

  const config = {
    method: "POST",
    url: "http://localhost:3000/register",
    headers: { "Content-Type": "application/json" },
    data: apiInfo,
  };

  await axios(config);
  console.log(`Fake API is running on port ${PORT}`);
});
