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
    return res.render("singin")
  });
  
  //takes you to the createaccount page 
  router.get("/createaccount", function(req, res) {
    return res.render("createaccount");
  });
  
  //this route will need to include a :id at the end so it goes to the specific user page
  router.get("/user/professional", function(req, res) {
    if(!req.session.user){
      res.redirect("/signin")
    }
    return res.render("professional");
  });
  
  //this route will need to include a :id at the end so it goes to the specific user page
  router.get("/user/owner", function(req, res) {
    if(!req.session.user){
      res.redirect("/signin")
    }
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
 
  );
  });
  

module.exports = router;