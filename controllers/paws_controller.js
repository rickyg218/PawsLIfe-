
var express = require("express");

var router = express.Router();

var db = require("../models");

// const { Router } = require("express");

// //=========================HERE BEGIN THE ROUTES FOR THE USERS ========================

// //get user by id 
router.get("/users/:id", function(req, res) {
  db.User.findOne({
    where: {id: req.params.id}
  }).then(function(dbUser) {
    console.log(dbUser);
    res.json( dbUser)
  }).catch(function(err){
    res.status(500).json(err);
  });
});

// update user by id 
router.put("/users/update/:id", function(req, res) {
  db.User.update(req.body,
  {
    where: {
      id: req.params.id
    }
  }
  ).then(function(dbUsers) {
    res.json(dbUsers);
  }).catch(function(err){
    res.status(500).json(err);
  });
});

//delete user by id 
router.delete("/users/delete/:id", function (req, res) {
  db.User.destroy({
    where: {
      id: req.params.id
    }
  }).then(function (dbUsers) {
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
});
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
// //create pet 
router.post("/pets/create", function(req,res) {
  if(!req.session.user){
    return res.status(401).send("login first")
  }
  db.Pet.create({
      first_name: req.body.first_name,
      special_care:req.body.special_care,
      pet_type: req.body.pet_type,
      breed:req.body.breed,
      size:req.body.size,  
      temperment:req.body.temperment,  
      age:req.body.age,  
      picture:req.body.picture,   
      UserId:req.session.user.id
  }).then(function(dbPet) {
      console.log(dbPet);
      res.json(dbPet);
    }).catch(function(err){
      console.log(err);
      res.status(500);
    });
})

// //get all pets
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

// //get pet by id 
router.get("/pets/:id", function (req,res) {
 db.Pet.findOne({
    where: {id:req.params.id}
  }).then(function(dbPet){
    // const dbPetsJson = dbPet.map(pet=>pet.toJSON());
    // var hbrsObject = { pet: dbPetsJson };
    return res.json({pet: dbPet})
  }).catch(function (err) {
    res.status(500).json(err);
  })

})

// //update pet by id
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

// //delete pet by id
router.delete("/pets/:id", function (req, res) {
  //protection if they aren't logged in
  if(!req.session.user){
    return res.status(401).send("login first!")
  }else {
    db.Pet.findOne({
      where: {
        id:req.params.id
      }
    }).then(dbPet=>{
      //if it is not the same user who created the pet protection
      if(req.session.user.id!==dbPet.UserId){
        return res.status(401).send("not your pet")
      }else {
        //if it is the user than delete
        db.Pet
        .destroy({
          where: {
            id: req.params.id,
          },
        })
        .then(function (data) {
          res.json(` the pet with id of ${req.params.id} is gone`);
        }).catch(function (err) {
          console.log(err);
          res.status(500)
        })
      }
    })
    
  }
  

});

// //=====================HERE END THE ROUTES FOR THE PETS===================================




//==============================HERE BEGIN THE RATING ROUTES===========================================
// create rating 
router.post("/ratings/create", function (req, res) {
  db.Rating.create({
    service_name : req.body.service_name,
    text_review : req.body.text_review,
    rating : req.body.rating
  }).then(function (dbRating) {
        console.log(dbRating);
        res.json(dbRating);
      }).catch(function(err){
        res.status(500).json(err);
      });
    });

// get all ratings 
router.get("/ratings", function (req,res) {
  db.Rating.findAll({
    include: [db.User, db.Pet]
  }).then(function (dbRating){
    console.log(dbRating)
    return res.json(dbRating)
  }).catch(function(err){
    res.status(500).json(err);
  });
})

// get ratings by id
router.get("/ratings/:id", function (req,res) {
  db.Rating.findOne({
    where: {id: req.params.id}
  })
  .then(function(dbRating) {
    // const dbRatingJson = (dbRating=>Rating.toJSON());
    // var oneRating = { Rating: dbRatingJson };
    return res.json({rating: dbRating});
  })
  .catch(function(err){
    res.status(500).json(err);
  });
})

// update rating by id 
router.put("/ratings/update/:id", function (req,res) {
  db.Rating.update({
    service_name: req.body.service_name,
    text_review: req.body.text_review,
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

// delete rating by id
router.delete("/ratings/delete/:id", function (req, res) {
  db.Rating.destroy({
    where: {
      id: req.params.id
    }
  }).then(function (dbRating) {
    res.json(`destroyed the rating with id of ${req.params.id}`);
  }).catch(function(err){
    res.status(500).json(err);
  });
});


module.exports = router;
