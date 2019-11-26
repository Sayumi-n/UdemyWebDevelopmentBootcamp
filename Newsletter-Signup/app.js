// jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req,res){
   var firstName = req.body.fName;
   var lastName = req.body.lName;
   var email = req.body.email;

   var data = {
     members: [
       {
         email_adress: email,
         status:"subscribed"
       }
     ]
   };
   var jsonData = JSON.stringify(data);

   var options = {
     url: "https://us4.api.mailchimp.com/3.0/lists/55b2e873fe",
     method:"post",
     headers: {
       "Authorization":"sayumi1 ef988d64ba3beaae42d75d48c187363a-us4"
     },
     body: jsonData
   };

   request(options, function(error, response, ){
     if(error){
       res.send("There was an error with signing up, please try again.")
     }else{
       if(response.statusCode === 200){
         res.send("Successfully subscribed!")
       }else{
       console.log(response.statusCode);
     }
     }
   });
});


app.listen(3000, function(){
  console.log("Server is running on port 3000.");
});

// API key
// ef988d64ba3beaae42d75d48c187363a-us4
// list id
// 55b2e873fe
