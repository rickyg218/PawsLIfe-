var express = require("express");

const router = express.Router();

const db = require("../models");
// const { eq } = require("sequelize/types/lib/operators");

//main route welcome
router.get("/", function(req, res) {
  db.Post.findAll({
    include:[db.User]
  }).then(posts=>{
    console.log(posts);
  //   const postsJSON = posts.map(function(postObj){
  //     return postObj.toJSON;
  //   })
  //   console.log(postsJSON)
  // })
  //    res.render("index", {posts:postsJSON});
     res.render("index");
  });
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
    }
    return res.render("professional");
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