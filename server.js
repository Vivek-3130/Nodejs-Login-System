
const path = require('path');
const express = require('express');
const bodyparser = require('body-parser');
const session = require('express-session')
const app = express();
const{v4:uuidv4}=require('uuid')
const router=require('./router') //exported module
const port = process.env.PORT || 3000;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}))

app.use(session({
    secret:uuidv4(),//generate a random string formatted id:"550e8400-e29b-41d4-a716-446655440000"
    resave:false,
    saveUninitialized:true
}));

app.use('/route',router);  //action = "/route/login , /route/dashboard"

app.set('view engine','ejs');
//loading static files
app.use("/static",express.static(path.join(__dirname,'public')))
app.use("/assets",express.static(path.join(__dirname,'public/assets')))

// Home Route
app.get('/',(req,res)=>{
    res.render('base',{title:"Login System"});
})

app.listen(port,()=>{
    console.log(`Listening on port no ${port}`);
})