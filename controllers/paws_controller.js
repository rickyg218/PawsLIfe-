
var express = require("express");

var router = express.Router();

var db = require("../models");


router.get("/", function(req, res) {
  return res.render("index");
});

router.get("/user", function(req, res) {
  return res.render("user", {name:"nicole"});
});

router.get("/signin", function(req, res) {
  return res.render("signin");
});

router.get("/createaccount", function(req, res) {
  return res.render("createaccount");
});




























// //=========================HERE BEGIN THE ROUTES FOR THE OFFER POSTS ==============
//TO CHECK cannot
//offer_posts CREATE NEW POST TODO: test/finish this route
router.post("/offer_posts/create", function(req,res) {
  console.log(req.body)
  db.offer_post.create(req.body)
  .then(function(dbPost) {
      console.log(dbPost);
      //TODO: decide where this redirect will go, ask Nicole. for now will refresh the total posts page.
      // res.redirect("/offer_posts");
      res.json("good job, post posted")
    });
});

// //offer_posts READ ALL TODO: test this route/finish
// router.get("/offer_posts", function(req,res) {
  
//   db.Post.findAll()
  
//   .then(function(dbPost) {
//     console.log(dbPosts);
//     const dbPostsJson = dbPosts.map(post=>post.toJSON());
//     let hbrsObj = { offer_post : dbPostsJson };
//     // return res.render("offer_post", hbrsObj);
//     //TODO: convert the below to above line when post.handlebars exists or we know where it's rendering.
//     return res.json(hbrsObj);
//   })
// });

// router.get("/offer_posts/:range", function(req,res) {
//   let rangeRel = req.params.range;
//   if (0 < rangeRel < 2) {
//     db.offerPost
//       .findAll({
//         where: {
//           //TODO: the syntax for this is really funky -
//           // might need the op. and followed by a nest op, looking at the between operator for lat and long between the current value +-.1
//         },
//       })
//       .then(function (dbPost) {
//         console.log(dbPosts);
//         const dbPostsJson = dbPosts.map((post) => post.toJSON());
//         let hbrsObj = { offer_post: dbPostsJson };
//         // return res.render("offer_post", hbrsObj);
//         //TODO: convert the below to above line when post.handlebars exists
//         return res.json(hbrsObj);
//       });
//   }
//   if (2 < rageRel < 5) {
//     db.offerPost
//     //TODO: work on the joins involved this has joins written all over it 
//       .findAll({
//         where: {
//           //the syntax for this is really funky -
//           // might need the op. and followed by a nest op, looking at the between operator for lat and long between the current value +-.1 this ultimately depends on how lat and lon are taken in, displayed, and where.
//         },
//       })
//     .then(function (dbPost) {
//       console.log(dbPosts);
//       const dbPostsJson = dbPosts.map((post) => post.toJSON());
//       let hbrsObj = { offer_post: dbPostsJson };
//       // return res.render("offer_post", hbrsObj);
//       //TODO: convert the below to above line when post.handlebars exists
//       return res.json(hbrsObj);
//     });
//   }
// });


// // offer_posts UPDATE, by post id. TODO: needs test/finish
// router.put("offer_posts/update/:id", function (req,res) {

//   db.offerPost.update({
//     title: req.body.title,
//     text: req.body.text,
//     size_restrictions: req.body.size_restrictions,
//     animal_type: req.body.animal_type,
//     duration: req.body.duration,
//     range: req.body.range,
//     //TODO: verify need for range. may have to mathematically convert "range" into an over/under in the lat and long comparisons for read.
//     cost: req.body.cost,
//     service_type: req.body.service_type,
//     //TODO: verify how pictures will be used
//     pictures: req.body.pictures,
//   },
//   {where: {
//     id: req.params.id
//   }})
//   .then(function(dbPosts){
//     res.json(`changed the post with id of ${req.params.id}`)
// });
// });

// // offer_posts DELETE, by post id.
// router.delete("/offer_posts/:id", function(req, res) {
//  //TODO: needs to tested/finished
//     db.offerPost.destroy(
//       {
//         where: { id: req.params.id },
//       },
//       function (result) {
//         if (result.affectedRows == 0) {
//           // If no rows were changed, then the ID must not exist, so 404
//           return res.status(404).end();
//         } else {
//           res.status(200).end();
//         }
//       }
//     );
// });

// //=========================HERE ENDS THE ROUTES FOR THE OFFER POSTS ==============





// //=====================HERE BEGIN THE ROUTES FOR THE PETS=========================
//pets CREATE TODO: untested!
// router.post("/pets/create", function(req,res) {
  
//   db.Pet.create(
//     req.body 
//   )
//   .then(function(dbPost) {
//       console.log(dbPost);
//       //TODO: decide where this redirect will go, ask Nicole. for now will take us to /pets
//       // res.redirect("/pets");
//       res.json(console.log("good boy, pet made"));
//     });
// });

// //pets READ: go get the pets belonging to the owner. how will we pass the owner data into the pet search? will we send the owner id to the url and grab it from there? let's ask Joe and Denis! restful convention says don't hang ONTO the data. look into login status. TODO: untested!
// router.get("/pets/:id", function (req,res) {

//   db.Pet.findAll({
//     where: {cust_id:req.params.id}
//   }).then(function(dbPet){
//     console.log(dbPet);
//     const dbPetsJson = dbPet.map(pet=>pet.toJSON());
//     var hbrsObject = { pet: dbPetsJson };
//     // return res.render("nICOLESlAYOUThANDLEbARhERE", hbrsObject) //TODO: turn this into a real subframe render.
//     return res.json("the pet.findAll-where was successful", hbrsObject)
//   })

// })
// //pets UPDATE    TODO: untested! please test and revise
// router.put("pets/update/:id", function (req,res) {

//   db.Pet.update({
//     name: req.body.name,
//     special_care: req.body.special_care,
//     pet_type: req.body.pet_type,
//     breed: req.body.breed,
//     size: req.body.size,
//     temperment:req.body.temperment,
//     age: req.body.age,
//     picture: req.body.picture
//   },
//   {where: {
//     id: req.params.id
//   }})
//   .then(function(dbPosts){
//     res.json(`updated the pet information for pet with id of ${req.params.id}`)
// });
// });

// // pets DELETE, by pet id.
// router.delete("/pets/delete/:id", function(req, res) {
//   //TODO: needs to tested/finished
//      db.Pet.destroy(
//        {
//          where: { id: req.params.id },
//        },
//        function (result) {
//          if (result.affectedRows == 0) {
//            // If no rows were changed, then the ID must not exist, so 404
//            return res.status(404).end();
//          } else {
//            res.status(200).end();
//          }
//        }
//      );
//  });
// //TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:
// //=====================HERE END THE ROUTES FOR THE PETS===========================



module.exports = router;
