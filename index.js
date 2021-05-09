//import required dependencies
const express=require('express');
const profiledb=require('./db/dealer-database');
const dealerRouter=require('./routes/dealer-route');

//Initialising express app
const app=express();

const apiVersion='v1';

//Assigning port 
const PORT= process.env.PORT || 3000;

//enable json in request 
app.use(express.json())

//Registering all queues
function registerRoutesAndStartListening()
{
 
  //Routes for profile functions
  app.use(`/api/${apiVersion}/services`, dealerRouter);
  //Start listening for requests on PORT
  app.listen(PORT, () =>
    console.log("CRUD Server is listening on localhost:" + PORT)
  );
}

//Connecting to all essential databases before firing up the API
Promise.all([profiledb.ConnectToDb()])
    .then(()=>{
        console.log("Connected to All Databases")
        registerRoutesAndStartListening();
    })
    .catch((err)=>console.log(err));

    
module.exports=app;