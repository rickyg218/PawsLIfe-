
var express = require("express");

var router = express.Router();

var db = require("../models");


// router.get("/provider", function(req, res) {

// //   db.Provider.findAll()

//     .then(function(dbProvider) {
//       console.log(dbProvider);
//       const dbProviderJson = dbProvider.map(Provider=>Provider.toJSON());
//       var allProvider = { Provider: dbProviderJson };
//       return res.render("index", allProvider);
//     });
// });



// router.post("/provider/create", function (req, res) {
//   db.Provider.create({
//   }).then(function (dbProvider) {
//     console.log(dbProvider);
//     res.redirect("/provider");
//   });
// });





// router.put("/provider/update/:id", function (req, res) {
//   db.Provider.update({
//     Created: true
//   },
//     {
//       where: {
//         id: req.params.id
//       }
//     }
//   ).then(function (dbProvider) {
//     res.json("/");
//   });
// });

// router.delete("/provider/:id", function (req, res) {
//   db.Providers.destroy({
//     where: {
//       id: req.params.id
//     }
//   }).then(function (dbProvider) {
//     res.json(dbProvider);
//   });
// });



router.post("/User/create", function(req, res) {
  db.User.create({
    user_name: req.body.user_name,
    first_name: req.body.first_name,
    last_name:req.body.last_name,
    email:req.body.email,
    password:req.body.password,
    phone: req.body.phone,
    lat: req.body.lat,
    long: req.body.long
  }).then(function(dbUser) {
      console.log(dbUser);
      // res.redirect("/Users");
      res.json("success")
    }).catch(function(err){
      res.status(500).json(err);
    });
    
});



// router.put("/Users/update/:id", function(req, res) {
//   db.Users.update({
//     Created: true
//   },
//   {
//     where: {
//       id: req.params.id
//     }
//   }
//   ).then(function(dbUsers) {
//     res.json("/");
//   });
// });

// router.delete("/Users/:id", function (req, res) {
//   db.Users.destroy({
//     where: {
//       id: req.params.id
//     }
//   }).then(function (dbUsers) {
//     res.json(dbUsers);
//   });
// });



module.exports = router;
