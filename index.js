var express=require('express');
var userroute=require("./routes/user");
var managerroute=require("./routes/manager");
var bodyparser=require("body-parser");
var upload=require("express-fileupload");
var mysql=require("mysql");
var util=require("util");
var session=require("express-session");
var app=express();
app.use(bodyparser.urlencoded({extended:true}));
app.use(upload());
app.use(express.static("public/"));
app.use(session({
    secret:"chavan",
    resave:true,
    saveUninitialized:true
}));
app.use("/",userroute);
app.use("/manager",managerroute);
app.get("/",async function(req,res){
    res.send("hello");
});
 app.listen(1000);