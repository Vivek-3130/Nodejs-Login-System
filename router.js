var express = require('express');
var router = express.Router();

const credential = {
    email:"admin@gmail.com",
    password:"admin@123"
}
//login user
router.post('/login',(req,res)=>{
    if(req.body.email == credential.email && req.body.password == credential.password){
        req.session.user = req.body.email;
        res.redirect('/route/dashboard');
        // res.end("Login Successfully");
    }
    else{
        res.end("Invalid Credentials")
    }
})

// Route for dashboard
router.get('/dashboard',(req,res)=>{
    if(req.session.user){
        res.render('dashboard',{user: req.session.user});
    }
    else{
        res.send("Unauthorised Used!")
    }
})

//Route for logout
//this coming from the href link in the logout section and then rendering the page tp base.ejs
router.get('/logout',(req,res)=>{
    req.session.destroy(function(err){
        if(err) {
            console.log(err)
            res.send("Error");
        }
        else{
            res.render('base',{title:"Express",logout:"Logout Successfully...!"})
        }
    });
})

module.exports = router; //in the server.js