var express = require("express");
const session = require("express-session");

var db = require("./models");

var app = express();

app.use(express.static("public"));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");


//ROUTES
var routes_paws = require("./controllers/paws_controller.js");
var routes_frontend = require("./controllers/frontend_controller.js");
var routes_auth = require("./controllers/auth_controller.js");


//SESION
app.use(session({
  //secret string that will encrypt my sessions
  secret: "nicole",
  resave: false,
  saveUninitialized: true,
  //the session will last for 2 hours
  cookie: {
    maxAge: 7200000
  }
}))


//USE ROUTES
app.use(routes_paws);
app.use(routes_frontend);
app.use(routes_auth);


//LISTENING TO SERVER
var PORT = process.env.PORT || 3030;
db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App now listening on port:", PORT);
    
  });

});
