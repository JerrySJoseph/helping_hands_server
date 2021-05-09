const config = require("../utils/config-parser");
const dbHandler = require('../data-access/dealer/dealer-access');

const log = require("../utils/log");

const TAG='REQ-VALIDATOR';

module.exports.validateRead = (req, res, next) =>
{
  const { device_fingerprint } = req.headers;
  log("validating client with ID: " + device_fingerprint['clientID']);
  isValidfingerprint(JSON.parse(device_fingerprint))
    .then(() => next())
    .catch((ex) =>
      res.status(ex.code).send({
        success: false,
        message: ex.message,
        result: null,
      })
    );
};

module.exports.validateCreate = (req, res, next) =>
{
  const { device_fingerprint } = req.headers;
   log("validating client with ID: " + device_fingerprint["clientID"]);
  Promise.all([
    isValidfingerprint(JSON.parse(device_fingerprint)),
    isNotregisteredBefore(req),
  ])
    .then(() => next())
    .catch((ex) =>
      res.status(ex.code).send({
        success: false,
        message: ex.message,
        result: null,
      })
    );
};

function isValidfingerprint(device_fingerprint)
{
  return new Promise((resolve, reject) =>
  {
    log(device_fingerprint)
    config.getValue("devices", []).forEach((device) =>
    {
      if (
        device["SHA_256"] == device_fingerprint["SHA_fingerprint"] &&
        device["package_name"] == device_fingerprint["packageName"]
      )
        resolve();
    });
    reject({ message: "Device fingerprint is not valid. Request unauthorized", code: 401 });
  });
}

function isNotregisteredBefore({ body })
{
  return new Promise(async (resolve, reject) =>
  {

    const exists = await dbHandler.checkExists(body.payload);
    if (exists)
      reject({
        message: "Phone is registered before",
        code: 400,
      });
    else
      resolve();
  })
}
