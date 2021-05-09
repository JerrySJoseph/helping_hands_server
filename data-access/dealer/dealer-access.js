const dbConnection = require("mongoose").connection;

const watchStore = [];

function insertOne(object) {
  return dbConnection.collection("dealer_data").insertOne(object);
}
function insertMany(object)
{
 return dbConnection.collection("dealer_data").insertMany(object);
}
function read(
  collectionName,
  filterQuery = {},
  selectionQuery = {},
  limit = 0
) {
    return dbConnection
    .collection(collectionName)
    .find(filterQuery)
    .project(selectionQuery)
    .limit(limit)
    .toArray();
}

function readAll()
{
    return read("dealer_data");
}
function readFor(payload)
{
  return read("dealer_data", { "address.state": payload.state});
}
function checkExists(object)
{
  console.log(object);
  return dbConnection.collection("dealer_data").findOne({phone:object.phone});
}
module.exports = { insertOne, read, readAll, readFor, insertMany, checkExists };
