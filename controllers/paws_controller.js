
var express = require("express");

var router = express.Router();

var db = require("../models");


router.get("/providers", function(req, res) {

  db.Providers.findAll()

    .then(function(dbProviders) {
      console.log(dbProviders);
      const dbProvidersJson = dbProviders.map(Providers=>Providers.toJSON());
      var allProviders = { Providers: dbProvidersJson };
      return res.render("index", allProviders);
    });
});



router.post("/providers/create", function (req, res) {
  db.Providers.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone
  }).then(function (dbProviders) {
    console.log(dbProviders);
    res.redirect("/providers");
  });
});


router.put("/providers/update/:id", function (req, res) {
  db.Providers.update({
    Created: true
  },
    {
      where: {
        id: req.params.id
      }
    }
  ).then(function (dbProviders) {
    res.json("/");
  });
});

router.delete("/providers/:id", function (req, res) {
  db.Providers.destroy({
    where: {
      id: req.params.id
    }
  }).then(function (dbProviders) {
    res.json(dbProviders);
  });
});



router.post("/Users/create", function(req, res) {
  db.Users.create({
    name: req.body.name,
    email:req.body.email,
    password:req.body.password,
    phone: req.body.phone
  }).then(function(dbUsers) {
      console.log(dbUsers);
      res.redirect("/Users");
    });
});


router.put("/Users/update/:id", function(req, res) {
  db.Users.update({
    Created: true
  },
  {
    where: {
      id: req.params.id
    }
  }
  ).then(function(dbUsers) {
    res.json("/");
  });
});

router.delete("/Users/:id", function (req, res) {
  db.Users.destroy({
    where: {
      id: req.params.id
    }
  }).then(function (dbUsers) {
    res.json(dbUsers);
  });
});



module.exports = router;
