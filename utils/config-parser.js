const fs = require("fs");

const rawData = fs.readFileSync("config.json");
const config = JSON.parse(rawData);

module.exports.getValue=function(name, defaultValue) {
  return config[name] == null || config[name].length < 1
    ? defaultValue
    : config[name];
}

module.exports.isDebug=function()
{
  return config.debug?config.debug:false;
}


