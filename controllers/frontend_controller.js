var express = require("express");

const router = express.Router();

const db = require("../models");
const { route } = require("./paws_controller");
const { response } = require("express");
// const { eq } = require("sequelize/types/lib/operators");



// main route welcome gets all posts plus user info
router.get("/", function(req, res) {
  db.Post.findAll({
    include:[
      {model:db.User, as:"Provider"},
      {model:db.User, as:"Booker"}
    ]
  }).then(userPosts=>{
    const userPostsJSON = userPosts.map(function(postObj){
      return postObj.toJSON();
    })
    const hbsObj={
      posts:userPostsJSON
    }
    console.log(userPostsJSON)
    res.render("index", hbsObj);
  }).catch(function(err){
    res.status(500).json(err);
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

  //logs you out of session
  router.get("/loggout", (req,res)=>{
    req.session.destroy();
    res.send("logged out")
  })
  
  //this route will need to include a :id at the end so it goes to the specific user page
  router.get("/user/professional", function(req, res) {
    if(!req.session.user){
      res.redirect("/signin")
    } else{
      db.User.findOne({
        where:{
          id:req.session.user.id
        },
        include: [
          {model:db.Post, as:"Provider"},
          {model:db.Post, as:"Booker"}
        ]
         
      }).then(userObj=>{
        // res.json(userObj)
        //this grabs just the json response not all of the extra stuff that normally is sent back
        const userObjJSON = userObj.toJSON();
        return res.render("professional", userObjJSON);
      }).catch(function(err){
        res.status(500).json(err);
      });
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
        include: [
          {
            model:db.Pet, as:"Customer"
          }
        ]
         
      }).then(userProfile=>{
        const userProfileJSON = userProfile.toJSON();
        console.log(userProfileJSON)
        return res.render("owner", userProfileJSON);
      }).catch(err=>{
        if(err) throw err;
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
      }).catch(function(err){
        res.status(500).json(err);
      });
    }
  });
  
//book an offer post 
router.put("/offer_posts/:id/bookpost",(req,res)=>{
  db.Post.update({
      BookerId: req.session.user.id
  }, {
      where: {
          id: req.params.id
      }
  }).then(postData => {
      // res.json(postData)
      res.json({claimedBy:req.session.user.id})
  }).catch(err => {
      console.log(err);
      res.status(500).end()
  })
})



//API ROUTES 
//all pets with users 
router.get("/api/pets/users", function(req, res){
  db.Pet.findAll({
    include:[{model:db.User, as:"Customer"}]
  }).then(pets=>{
    res.json(pets)
  });
})


//all posts with users 
router.get("/api/posts/users", function(req, res) {
  db.Post.findAll({
    include:[{model:db.User, as:"Provider"}]
  }).then(posts=>{
    res.json(posts)
  });
});

//all users with pets 
  router.get("/api/users/pets", function(req, res){
    db.User.findAll({
      include:[{model:db.Pet, as:"Customer"}]
    }).then(users=>{
      // const userJSON = users.toJSON();
      res.json(users)
    });
  })

//all users with posts 
  router.get("/api/users/posts", function(req, res){
    db.User.findAll({
      include:[{model:db.Post, as:"Provider"}]
    }).then(users=>{
      // const userJSON = users.toJSON();
      res.json(users)
    });
  })

module.exports = router;