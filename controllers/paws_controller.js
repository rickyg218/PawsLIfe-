
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
   
    first_name: req.body.first_name,
    last_name:req.body.last_name,
    user_name: req.body.user_name,
    password:req.body.password,
    email:req.body.email, 
    // lat: req.body.lat,
    // long: req.body.long
  }).then(function(dbUser) {
      console.log(dbUser);
      // res.redirect("/Users");
      res.json(dbUser)
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
    res.json( dbUser)
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
    res.json(dbUsers);
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




// //=========================HERE BEGIN THE ROUTES FOR THE OFFER POSTS ========================
//offer_posts CREATE NEW POST 
router.post("/offer_posts/create", function(req,res) {
  console.log(req.body)
  db.Post.create({
    title: req.body.title,
    text:req.body.text,
    animal_type: req.body.animal_type,
    size_restrictions:req.body.size_restrictions,
    duration:req.body.duration, 
    range:req.body.range, 
    picture:req.body.picture, 
    service_type:req.body.service_type, 
  })
  .then(function(dbPost) {
      console.log(dbPost);
      //TODO: decide where this redirect will go, ask Nicole. for now will refresh the total posts page.
      // res.redirect("/offer_posts");
      res.json(dbPost)
    }).catch(function(err){
      res.status(500).json(err);
    });
});

// //offer_posts READ ALL 
router.get("/offer_posts", function(req,res) {
  
  db.Post.findAll()
  
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


// // offer_posts UPDATE, by post id. 
router.put("/offer_posts/update/:id", function (req,res) {

  db.Post.update({
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
  db.Post
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
  
  db.Pet.create({
    first_name: req.body.first_name,
    special_care:req.body.special_care,
    pet_type: req.body.pet_type,
    breed:req.body.breed,
    size:req.body.size,  
    temperment:req.body.temperment,  
    age:req.body.age,  
    picture:req.body.picture,   
  })
  .then(function(dbPet) {
      console.log(dbPet);
      //TODO: decide where this redirect will go, ask Nicole. for now will take us to /pets
      // res.redirect("/pets");
      res.json(dbPet);
    }).catch(function(err){
      console.log(err);
      res.status(500);
    });
})


router.get("/pets", function(req,res) {
  db.Pet.findAll()
  .then(function(dbPet) {
    console.log(dbPet);
    let hbrsObj = { pets : dbPet };
    return res.json(hbrsObj);
  }).catch(function(err){
    res.status(500).json(err);
  });
});


router.get("/pets/:id", function (req,res) {
 db.Pet.findOne({
    where: {id:req.params.id}
  }).then(function(dbPet){
    // const dbPetsJson = dbPet.map(pet=>pet.toJSON());
    // var hbrsObject = { pet: dbPetsJson };
    // return res.render("nICOLESlAYOUThANDLEbARhERE", hbrsObject) //TODO: turn this into a real subframe render.
    return res.json({pet: dbPet})
  }).catch(function (err) {
    res.status(500).json(err);
  })

})



//pets UPDATE    TODO: untested! please test and revise
router.put("/pets/update/:id", function (req,res) {

  db.Pet.update({
    first_name: req.body.first_name,
    special_care: req.body.special_care,
    pet_type: req.body.pet_type,
    breed: req.body.breed,
    size: req.body.size,
    temperment:req.body.temperment,
    age: req.body.age,
    picture: req.body.picture
  },
  {where: {
    id: req.params.id
  }})
  .then(function(dbPosts){
    res.json(`updated the pet information for pet with id of ${req.params.id}`)
}).catch(function(err){
  console.log(err);
  res.status(500).json(err);
});
});

router.delete("/pets/:id", function (req, res) {
  db.Pet
    .destroy({
      where: {
        id: req.params.id,
      },
    })
    .then(function (dbPet) {
      res.json(` the pet with id of ${req.params.id} is gone`);
    }).catch(function (err) {
      console.log(err);
      res.status(500)
    })

});


// //TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:
// //=====================HERE END THE ROUTES FOR THE PETS===================================

//==============================HERE BEGIN THE RATING ROUTES===========================================

router.post("/ratings/create", function (req, res) {
  db.Rating.create({
    UserId : req.body.uid,
    PetId : req.body.peid,
    ProviderId : req.body.prid
  }).then(function (dbRating) {
        console.log(dbRating);
        // res.redirect("/rating");
        //TODO: link this properly with the frontend, both on req.body having an id key (or whatever it's called)
        res.json("we made you that customer");
      }).catch(function(err){
        res.status(500).json(err);
      });
    });

router.get("/ratings", function (req,res) {
  db.Rating.findAll({
    include: [db.User, db.Pet, db.Provider]
  }).then(function (dbRating){
    console.log(dbRating)
    //   //TODO: make sure this render is correct
    //   return res.render("index", allCustomer);
    return res.json(dbRating)
  }).catch(function(err){
    res.status(500).json(err);
  });
})


router.get("/ratings/:id", function (req,res) {
  db.Rating.findOne({
    where: {id: req.params.id}
  })
  .then(function(dbRating) {
    const dbRatingJson = (dbRating=>Rating.toJSON());
    var oneRating = { Rating: dbRatingJson };
    //TODO: make sure this render is correct
    return res.render("index", oneRating);
  })
  .catch(function(err){
    res.status(500).json(err);
  });
})

router.put("/ratings/update/:id", function (req,res) {
  db.Rating.update({
    service_title: req.body.title,
    text: req.body.text,
    rating: req.body.rating,
  },
  {where: {
    id: req.params.id
  }})
  .then(function(dbRating){
    console.log(dbRating)
    res.json(`changed the rating with id of ${req.params.id}`)
}).catch(function(err){
  console.log(err);
  res.status(500).json(err);
});;
});

router.delete("/ratings/delete/:id", function (req, res) {
  db.Rating.destroy({
    where: {
      id: req.params.id
    }
  }).then(function (dbRating) {
    // res.json(dbUsers);
    res.json(`destroyed the rating with id of ${req.params.id}`);
  }).catch(function(err){
    res.status(500).json(err);
  });
});


module.exports = router;
