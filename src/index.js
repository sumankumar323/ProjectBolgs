const express=require('express');
const bodyParser=require('body-parser');
const route=require("./route/routes");
const mongoose=require('mongoose');
const app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))//to receive url encoded data

mongoose.connect("mongodb+srv://sangamsuman323:XVZrnDNPfS8c21p8@cluster0.bolaw.mongodb.net/Project1",{useNewUrlParser:true});


console.log("MongoDb is connected") 

app.use('/',route);

app.listen(process.env.PORT||3000,()=>{
    console.log('First Project SERVER RUNNING ON'  + (process.env.PORT|| 3000))
})