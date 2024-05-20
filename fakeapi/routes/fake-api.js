const express = require("express");

const fakeApi = express.Router();

fakeApi.get("/fakeApi", (req, res) => {
  return res.send("This is a non-bogus fake api!");
});

fakeApi.post("/bogusApi", (req, res) => {
  return res.send("This is a bogus fake api!");
});

module.exports = fakeApi;
