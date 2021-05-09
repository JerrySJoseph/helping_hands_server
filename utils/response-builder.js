module.exports.build = function (success, message = "", result = {})
{
  return {
    success,
    message,
    result,
  };
};

module.exports.failure = function (message = "")
{
  return this.build(false, message, null)
};

module.exports.success = function (message = "", result)
{
  return this.build(true, message, result);
};