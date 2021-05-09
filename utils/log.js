const config=require('../utils/config-parser');

module.exports = function (object, TAG = "") {
  if (!config.isDebug())return;
  if(typeof object ==='object')
    object=JSON.stringify(object);
    console.log(`[${TAG}] ${object}`);
};

