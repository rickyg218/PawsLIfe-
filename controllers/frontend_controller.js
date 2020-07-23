var express = require("express");
const router = require("express").Router();
const db = require("../models")

//main route welcome
router.get("/", function(req, res) {
    return res.render("index");
  });
  
  //redirects you to the user owner page as a default and will need the user :id param
  router.get("/user", function(req, res) {
    return res.redirect("/user/owner");
  });
  
  //takes you to the sign in page
  router.get("/signin", function(req, res) {
    return res.render("signin");
  });
  
  //takes you to the createaccount page 
  router.get("/createaccount", function(req, res) {
    return res.render("createaccount");
  });
  
  //this route will need to include a :id at the end so it goes to the specific user page
  router.get("/user/professional", function(req, res) {
    return res.render("professional", {name:"nicole"});
  });
  
  //this route will need to include a :id at the end so it goes to the specific user page
  router.get("/user/owner", function(req, res) {
    // db.User.findOne(
    //    {
    //     where: {
    //         id: req.params.id
    //     }
    //    }
    // ).then(function(userData){
    //     const userDataJSON = userData.map(userObj=>{
    //         return userObj.toJSON();
    //     })
    //     const hbsObj = {
    //         users:userDataJSON
    //     }
    //     console.log(userDataJSON)
    // })
    // return res.render("owner", hbs);
    return res.render("owner", {name:"nicole"});
  });
  
  //gets user account profile. this route will need to include a :id at the end so it goes to the specific user page
  router.get("/user/account-profile", function(req, res) {
    //   db.User.findOne(
    //       {
    //         where: {
    //             id: req.params.id
    //         }
    //   }).then(userData=>{
    //       const userJSON = userData.toJSON();
    //   })
    // return res.render("account-profile", userJSON);
    return res.render("account-profile", 
    {name:"nicole"},
  // {firstname:"nicole"},
  // {lastname:"remy"},
  // {username:"nicole2839"},
  // {password:"password"},
  // {phone:"2837381973"},
  // {email:"nicole@remy.com"},
  );
  });
  

module.exports = router;