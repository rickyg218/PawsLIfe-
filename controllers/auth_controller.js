var express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");

var db = require("../models");

// create users 
router.post("/users/create", function(req, res) {
  db.User.create({
   
    first_name: req.body.first_name,
    last_name:req.body.last_name,
    user_name: req.body.user_name,
    password:req.body.password,
    email:req.body.email, 
    lat: req.body.lat,
    long: req.body.long
  }).then(function(dbUser) {
      console.log(dbUser);
      res.json(dbUser)
    }).catch(function(err){
      res.status(500).json(err);
    });
    
});
 


//AUTHENTICATION LOG IN 
router.post("/signin", (req,res)=>{
    db.User.findOne({
      where: {
        user_name: req.body.user_name
      }
    }).then(user=>{
      if(!user){
        return res.status(404).send("no such user")
      } else{
        if (bcrypt.compareSync(req.body.password, user.password)){
          req.session.user = {
            id: user.id,
            first_name: user.first_name,
            user_name: user.user_name
  
          }
          res.send("login sucessful!")
        } else{
        res.status(401).send("wrong password")
        }
      }
    }).catch(err=>{
      res.status(500).end();
    })
  })
  
  //SESSIONS 
  router.get("/readsessions", function(req,res){
     res.json(req.session)
  })
  
  //SECRET ROUTE
  router.get("/secretroute", function(req,res){
    if (req.session.user){
      res.send(`welcome to PAWSLIFE ${req.session.user.first_name} `)
    }else{
      res.status(401).send("login first please")
    }
  })

  //LOG OUT
  router.get("/logout", (req,res)=>{
    req.session.destroy();
    res.send("logged out!")
  })
module.exports = router;