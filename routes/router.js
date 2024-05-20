const axios = require("axios");
const express = require("express");
const registry = require("./registry.json");
const { writeFile } = require("fs");

const router = express.Router();

router.all("/:apiName/:apiRoute", async (req, res) => {
  const apiName = registry.services[req.params.apiName];
  const apiRoute = req.params.apiRoute;
  const config = {
    method: req.method,
    url: `${apiName.url}/${apiRoute}`,
    headers: req.headers,
    data: req.body,
  };

  if (apiName) {
    const response = await axios(config);
    return res.send(response.data);
  }
  throw new Error("API endpoint does not match!");
});

router.post("/register", async (req, res) => {
  const apiInfo = req.body;
  const { host, port, protocol } = apiInfo;
  apiInfo.url = `${protocol}://${host}:${port}`;

  if (!alreadyExist(apiInfo)) {
    registry.services[apiInfo.apiName].push(apiInfo);
  } else {
    return res.status(409).json({
      msg: "Configuration already exists!!",
    });
  }

  writeFile("./routes/registry.json", JSON.stringify(registry), (error) => {
    if (error) {
      throw new Error("Unable to register the api");
    }
    return res.status(200).json({
      ok: true,
      msg: "Endpoint API registered successfully!",
    });
  });
});

function alreadyExist(registrationInfo) {
  exisitingApis = registry.services[registrationInfo.apiName];

  for (const api of exisitingApis) {
    if (
      api.apiName === registrationInfo.apiName &&
      api.url === registrationInfo.url
    ) {
      return true;
    }
  }

  return false;
}

module.exports = router;
