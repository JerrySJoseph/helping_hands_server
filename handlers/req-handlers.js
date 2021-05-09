const dbHandler = require("../data-access/dealer/dealer-access");
const findMatches = require('../match-engine');
const responseBuilder = require('../utils/response-builder')
const log = require("../utils/log");


module.exports.handleCreate = function (req, res)
{

  dbHandler
    .insertOne(req.body.payload)
    .then((result) =>
    {
      log('created new record. Sending response...')
      const response = responseBuilder.success("Dealer saved to Database", result.ops[0]);
      res.status(200).send(response);
    })
    .catch((error) =>
    {
      log("Error :"+error.message);
      const response = responseBuilder.failure(error.message);
      res.status(400).send(response);
      
    });
};

module.exports.handleRead = function (req, res)
{

  dbHandler
    .readFor(req.body.payload)
    .then(async (result) =>
    {
      log('fetched data from database. Now generating matches.....');
      //generating matches
      result = findMatches(req.body.payload, result);

      log('generated matches successfully... Sending response..');
      const response = responseBuilder.success("Data fetched successfully", JSON.stringify(result));
      res.status(200).send(response);
    })
    .catch((error) =>
    {
        log("Error :" + error.message);
      const response = responseBuilder.failure(error.message);
      res.status(200).send(response);
    });
};

