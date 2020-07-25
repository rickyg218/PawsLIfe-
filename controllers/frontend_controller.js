var express = require("express");

const router = express.Router();

const db = require("../models");
// const { eq } = require("sequelize/types/lib/operators");

//takes you to a json array with objects containing all posts and their users
router.get("/api/posts", function(req, res) {
  db.Post.findAll({
    include:[db.User]
  }).then(posts=>{
    res.json(posts)
  });
});

// main route welcome gets all posts plus user info
router.get("/", function(req, res) {
  db.Post.findAll({
    include:[db.User]
  }).then(userPosts=>{
    const userPostsJSON = userPosts.map(function(postObj){
      return postObj.toJSON();
    })
    const hbsObj={
      posts:userPostsJSON
    }
    console.log(userPostsJSON)
    res.render("index", hbsObj);
  })
     
    
});

  
  //redirects you to the user owner page as a default and will need the user :id param
  router.get("/user", function(req, res) {
    return res.redirect("/user/owner");
  });
  
  //takes you to the sign in page
  router.get("/signin", function(req, res) {
    return res.render("signin")
  });
  
  //takes you to the createaccount page 
  router.get("/createaccount", function(req, res) {
    return res.render("createaccount");
  });
  
  //this route will need to include a :id at the end so it goes to the specific user page
  router.get("/user/professional", function(req, res) {
    if(!req.session.user){
      res.redirect("/signin")
    } else{
      db.User.findOne({
        where:{
          id:req.session.user.id
        },
        include: [{model:db.Post, as:"Provider"}]
         
      }).then(userObj=>{
        // res.json(userObj)
        //this grabs just the json response not all of the extra stuff that normally is sent back
        const userObjJSON = userObj.toJSON();
        return res.render("professional", userObjJSON);
      })
    }
  
  });
  
  //this route will need to include a :id at the end so it goes to the specific user page
  router.get("/user/owner", function(req, res) {
    if(!req.session.user){
      res.redirect("/signin")
    } else{
      db.User.findOne({
        where:{
          id:req.session.user.id
        },
        include: [{model:db.Pet, as:"Customer"}]
         
      }).then(userObj=>{
        // res.json(userObj)
        //this grabs just the json response not all of the extra stuff that normally is sent back
        const userObjJSON = userObj.toJSON();
        return res.render("owner", userObjJSON);
      })
    }
    
  });
  
  //gets user account profile. this route will need to include a :id at the end so it goes to the specific user page
  router.get("/user/account-profile", function(req, res) {
    if(!req.session.user){
      res.redirect("/signin")
    } else{
      db.User.findOne({
        where:{
          id:req.session.user.id
        },
        // include: [{model:db.User}]
         
      }).then(userObj=>{
        // res.json(userObj)
        //this grabs just the json response not all of the extra stuff that normally is sent back
        const userObjJSON = userObj.toJSON();
        return res.render("account-profile", userObjJSON);
      })
    }
  });
  

module.exports = router;