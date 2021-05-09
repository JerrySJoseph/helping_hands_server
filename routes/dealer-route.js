//import required dependencies
const router= require('express').Router();
const reqHandler=require('../handlers/req-handlers');
const validator=require('../utils/request-validator');
const log=require('../utils/log');

router.post('/ping',(req,res)=>{
    log('ping recieved')
    res.status(200).send({success:true,message:'server is live'});
})

//Create Route
router.post('/create',validator.validateCreate,(req,res)=>{

    log('validation success.. forwarding request to create route');
    reqHandler.handleCreate(req, res);

})
router.post("/read",validator.validateRead, (req, res) => {
  log("validation success.. forwarding request to read route");
  reqHandler.handleRead(req, res);
 
});
module.exports=router;