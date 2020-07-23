
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


//~~~~~~~~~~~~~~~~~~~~~~~~HERE BEGIN THE ROUTES FOR USERS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//users
router.post("/users/create", function(req, res) {
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

//this route pulls a specific user based on their ID, will be useful in redirecting user to their page after account creation as well as user selecting themselves/logging in
router.get("/users/:id", function(req, res) {
  db.User.findOne({
    where: {id: req.params.id}
  }).then(function(dbUser) {
    console.log(dbUser);
    // res.json(dbUser, `retrieved user with id: ${req.params.id}`);
    res.json("testing response success of user findOne")
    //TODO: check in with nicole where this will route to, pulling functional record correctly based on user id.
  }).catch(function(err){
    res.status(500).json(err);
  });
});

//this update route for users works, just needs to be res redirected properly via Nicole's plan
router.put("/users/update/:id", function(req, res) {
  db.User.update(req.body,
  {
    where: {
      id: req.params.id
    }
  }
  ).then(function(dbUsers) {
    //this should redirect us to homepage, may have to edit.
    // res.json("/");
    res.json("test for user update, nice job");
  }).catch(function(err){
    res.status(500).json(err);
  });
});

router.delete("/users/delete/:id", function (req, res) {
  db.User.destroy({
    where: {
      id: req.params.id
    }
  }).then(function (dbUsers) {
    // res.json(dbUsers);
    res.json(`destroyed the user account with id of ${req.params.id}`);
  }).catch(function(err){
    res.status(500).json(err);
  });
});
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~HERE END THE ROUTES FOR USERS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~



//==========================HERE BEGIN THE TODO: customer ROUTES======================================

router.post("/customers/create", function (req, res) {
  db.Customer.create({
    UserId : req.body.id
  }).then(function (dbCustomer) {
        console.log(dbCustomer);
        // res.redirect("/customer");
        //TODO: link this properly with the frontend, both on req.body having an id key (or whatever it's called)
        res.json("we made you that customer");
      }).catch(function(err){
        res.status(500).json(err);
      });
    });

router.get("/customers", function (req,res) {
  db.Customer.findAll({
    include: [db.User]
  }).then(function (dbCustomer){
    console.log(dbCustomer)
    //   //TODO: make sure this render is correct
    //   return res.render("index", allCustomer);
    return res.json(dbCustomer)
  }).catch(function(err){
    res.status(500).json(err);
  });
})


router.get("/customers/:id", function (req,res) {
  db.Customer.findOne({
    where: {id: req.params.id}
  })
  .then(function(dbCustomer) {
    const dbCustomerJson = (dbCustomer=>Customer.toJSON());
    var oneCustomer = { Customer: dbCustomerJson };
    //TODO: make sure this render is correct
    return res.render("index", oneCustomer);
  })
  .catch(function(err){
    res.status(500).json(err);
  });
})




//==========================HERE END THE customer ROUTES======================================


//================================HERE BEGIN THE PROVIDER ROUTES======================================
router.post("/providers/create", function (req, res) {
    db.Provider.create({
      UserId : req.body.id
    }).then(function (dbProvider) {
          console.log(dbProvider);
          // res.redirect("/provider");
          //TODO: link this properly with the frontend, both on req.body having an id key (or whatever it's called)
          res.json("we made you that provider");
        }).catch(function(err){
          res.status(500).json(err);
        });
      });

  router.get("/providers", function(req, res) {

  db.Provider.findAll({})
    .then(function(dbProvider) {
      console.log({dbProvider});
      //TODO: make sure this returns what frontend needs
      return res.json(dbProvider);
    }).catch(function(err){
      console.log("THIS IS THE ERROR ON 191", err)
      res.status(500).json(err);
    });
});

router.get("/providers/:id", function (req,res) {
  db.Provider.findOne({
    where: {id: req.params.id}
  })
  .then(function(dbProvider) {
    console.log(dbProvider)
    
   
    //TODO: make sure we are rendering properly or sending back to the right place for frontend
    return res.json({provider: dbProvider})
    // return res.render("index", {provider: dbProvider});
  })
  .catch(function(err){
    res.status(500).json(err);
  });
})

//==============================HERE END THE PROVIDER ROUTES===========================================



// //=========================HERE BEGIN THE ROUTES FOR THE OFFER POSTS ========================
//offer_posts CREATE NEW POST 
router.post("/offer_posts/create", function(req,res) {
  console.log(req.body)
  db.offer_post.create(req.body)
  .then(function(dbPost) {
      console.log(dbPost);
      //TODO: decide where this redirect will go, ask Nicole. for now will refresh the total posts page.
      // res.redirect("/offer_posts");
      res.json("good job, post posted")
    }).catch(function(err){
      res.status(500).json(err);
    });;
});

// //offer_posts READ ALL 
router.get("/offer_posts", function(req,res) {
  
  db.offer_post.findAll()
  
  .then(function(dbPost) {
    console.log(dbPost);
    let hbrsObj = { offer_posts : dbPost };
    // return res.render("offer_post", hbrsObj);
    //TODO: convert the below to above line when post.handlebars exists or we know where it's rendering.
    return res.json(hbrsObj);
  }).catch(function(err){
    res.status(500).json(err);
  });
});

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


// // offer_posts UPDATE, by post id. 
router.put("/offer_posts/update/:id", function (req,res) {

  db.offer_post.update({
    title: req.body.title,
    text: req.body.text,
    size_restrictions: req.body.size_restrictions,
    animal_type: req.body.animal_type,
    duration: req.body.duration,
    range: req.body.range,
    cost: req.body.cost,
    service_type: req.body.service_type,
    //TODO: verify how pictures will be used
    pictures: req.body.pictures,
  },
  {where: {
    id: req.params.id
  }})
  .then(function(dbPosts){
    console.log(dbPosts)
    res.json(`changed the post with id of ${req.params.id}`)
}).catch(function(err){
  console.log(err);
  res.status(500).json(err);
});;
});

// offer_posts DELETE, by post id.
router.delete("/offer_posts/:id", function (req, res) {
  db.offer_post
    .destroy({
      where: {
        id: req.params.id,
      },
    })
    .then(function (dbPosts) {
      res.json(`destroyed the offering post with id of ${req.params.id}`);
    }).catch(function(err) {
      console.log(err);
      res.status(500)
    })
    
});

// //=========================HERE ENDS THE ROUTES FOR THE OFFER POSTS ==============





// //=====================HERE BEGIN THE ROUTES FOR THE PETS=========================
// pets CREATE TODO: untested!
router.post("/pets/create", function(req,res) {
  
  db.Pet.create(
    req.body 
  )
  .then(function(dbPet) {
      console.log(dbPet);
      //TODO: decide where this redirect will go, ask Nicole. for now will take us to /pets
      // res.redirect("/pets");
      res.json("good boy, pet made");
    }).catch(function(err){
      console.log(err);
      res.status(500);
    });
})

// router.get("/pets", function(req,res) {
  
//   db.Pet.findAll()
  
//   .then(function(dbPet) {
//     console.log(dbPet);
//     let hbrsObj = { pets : dbPet };
//     // return res.render("offer_post", hbrsObj);
//     //TODO: convert the below to above line when post.handlebars exists or we know where it's rendering.
//     return res.json(hbrsObj);
//   }).catch(function(err){
//     res.status(500).json(err);
//   });
// });
// //pets READ
// router.get("/pets/:id", function (req,res) {

//   db.Pet.findOne({
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
// //=====================HERE END THE ROUTES FOR THE PETS===================================




module.exports = router;
