
var express = require("express");

var router = express.Router();

var db = require("../models");

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
  return res.render("owner", {name:"nicole"});
});

//gets user account profile. this route will need to include a :id at the end so it goes to the specific user page
router.get("/user/account-profile", function(req, res) {
  return res.render("account-profile", {name:"nicole"});
});





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
