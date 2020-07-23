
var express = require("express");

var router = express.Router();

var db = require("../models");


router.get("/", function(req, res) {
 
  
  return res.render("index");
});
router.get("/user", function(req, res) {
 
  
  return res.render("user");
});

// TODO:EVWORKSPACE--------------------------------------------------------

//offer_posts CREATE NEW POST
router.post("/offer_posts/create", function(req,res) {
  
  db.offerPost.create(
    req.body
    //might have to expand req.body later into component parts depending on what we are grabbing from each input. 
  )
  .then(function(dbPost) {
      console.log(dbPost);
      //TODO: decide where this redirect will go, ask Nicole. for now will refresh the total posts page.
      res.redirect("/offer_posts");
    });
})

//offer_posts READ ALL
router.get("/offer_posts", function(req,res) {
  
  // db.offerPost.findAll()
  
  // .then(function(dbPost) {
  //   console.log(dbPosts);
  //   const dbPostsJson = dbPosts.map(post=>post.toJSON());
  //   let hbrsObj = { offer_post : dbPostsJson };
  //   // return res.render("offer_post", hbrsObj);
  //   //TODO: convert the below to above line when post.handlebars exists
  //   return res.json(hbrsObj);
  // })
})

//TODO: add in several more findAll() WHERE: range < X will be trickier than normal - we will have to do a find all, then filter and calculate in a for loop. might be able to do that? or maybe just inputing a value range limit 

// offer_posts UPDATE method, by post id.
router.put("offer_posts/update:id", function (req,res) {

  db.offerPost.update({
    title: req.body.title,
    text: req.body.text,
    size_restrictions: req.body.size_restrictions,
    animal_type: req.body.animal_type,
    duration: req.body.duration,
    range: req.body.range,
    //TODO: verify need for range. may have to mathematically convert "range" into an over/under in the lat and long comparisons.
    cost: req.body.cost,
    service_type: req.body.service_type,
    //TODO: verify how pictures will be used
    pictures: req.body.pictures,
  },
  {where: {
    id: req.params.id
  }})
  .then(function(dbPosts){
    res.json(`changed the post with id of ${req.params.id}`)
})


// TODO:EVWORKSPACE----------------------------------------------------------------


// router.get("/burgers", function(req, res) {

//   db.Burger.findAll()

//     .then(function(dbBurger) {
//       console.log(dbBurger);
//       const dbBurgersJson = dbBurger.map(burger=>burger.toJSON());
//       var hbsObject = { burger: dbBurgersJson };
//       return res.render("index", hbsObject);
//     });
// });

// router.post("/burgers/create", function(req, res) {
//   db.Burger.create({
//     burger_name: req.body.burger_name
//   }).then(function(dbBurger) {
//       console.log(dbBurger);
//       res.redirect("/");
//     });
// });
//offer posting update 

// router.put("/burgers/update/:id", function(req, res) {
//   db.Burger.update({
//     devoured: true
//   },
//   {
//     where: {
//       id: req.params.id
//     }
//   }
//   ).then(function(dbBurger) {
//     res.json("/");
//   });
// });

module.exports = router;
