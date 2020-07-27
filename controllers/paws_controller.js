
var express = require("express");

var router = express.Router();

var db = require("../models");

const { Op } = require("sequelize");

// const { Router } = require("express");

// //get user by id 
router.get("/users/:id", function(req, res) {
  db.User.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {model:db.Pet, as:"Customer"},
      {model:db.Post, as:"Provider"}
    ]
  }).then(function(dbUser) {
    console.log(dbUser);
    res.json( dbUser)
    // return res.render("owner")
  }).catch(function(err){
    console.log(err)
    res.status(500).json(err);
  });
});

// update user by id 
router.put("/users/update/:id", function(req, res) {
  
  db.User.update(
    {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      user_name: req.body.user_name,
      email: req.body.email,
    },
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
    ProviderId:req.session.user.id,
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
  
  db.Post.findAll({})
  
  .then(function(dbPost) {
    console.log(dbPost);
    let hbrsObj = { offer_posts : dbPost };
    return res.json(hbrsObj);
  }).catch(function(err){
    res.status(500).json(err);
  });
});

//TODO: working find posts within a range that match an animal type
router.get("/offer_posts/:animal/:lat/:long", function(req,res){
  let latRange = [(parseFloat(req.params.lat)-0.100), (parseFloat(req.params.lat)+0.100)]
  let longRange = [(parseFloat(req.params.long)-0.150), (parseFloat(req.params.long)+0.150)]
  console.log(req.params.lat + " " + req.params.long);
 
  db.Post.findAll(
    {
      include: [
        {
          model: db.User,
           as: "Provider",
          where: {
            lat: {[Op.between]:latRange},
            long: {[Op.between]:longRange}
          },
        },
      ],
      where: { animal_type: req.params.animal },
    },
  )
    .then(function (dbPost) {
      //console.log("this console logs the dbPost return from get by lat long", dbPost);
      for (var i = 0; i < dbPost.length; i++){
           if ((req.params.lat == dbPost[i].Provider.lat) && (req.params.long == dbPost[i].Provider.long)) {
            dbPost[i].range = 0;
            console.log("we got it");
          }
         else {
            var radlat1 = Math.PI * req.params.lat/180;
            var radlat2 = Math.PI * parseFloat(dbPost[i].Provider.lat)/180;
            var theta = req.params.long-parseFloat(dbPost[i].Provider.long);
            var radtheta = Math.PI * theta/180;
            var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            if (dist > 1) {
              dist = 1;
            }
            dist = Math.acos(dist);
            dist = dist * 180/Math.PI;
            dist = dist * 60 * 1.1515;
            dbPost[i].range = dist.toFixed(2);
         }	
      } 
      let hbrsObj = { offer_posts: dbPost }  
      return res.json(hbrsObj);
    })
    .catch(function (err) {
      res.status(500).json(err);
    });
})
//offer_posts select by animal
router.get("/offer_posts/:animal", function(req,res){
  //service passed by clicking on "cat" or "dog" button

  console.log(req.params.animal);
  db.Post.findAll(
    {
      where: { animal_type: req.params.animal },
    }
  )
    .then(function (postsAnimal) {
      const postsAnimalJSON = postsAnimal.map(function(postsAnimalObj){
        return postsAnimalObj.toJSON();
      })
      const hbsObj={
        posts:postsAnimalJSON
      }
      console.log(postsAnimalJSON)
      res.render("index",hbsObj)
    })
    .catch(function (err) {
      res.status(500).json(err);
    });
})


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
//DELETE Post by Post id DESTROY
  router.delete("/offer_posts/delete/:id", function (req, res) {
    db.Post.destroy({
        where: {
          id: req.params.id,
        },
    }).then(function (data) {
        res.json(` the Post with id of ${req.params.id} is gone`);
    }).catch(function (err) {
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
      // TODO: ask joe if CustomerId or UserId 
      CustomerId:req.session.user.id,

  }).then(function(dbPet) {
      console.log(dbPet);
      res.json(dbPet.id);
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
router.delete("/pets/delete/:id", function (req, res) {
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
