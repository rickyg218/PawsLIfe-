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

var routes_paws = require("./controllers/paws_controller.js");
var routes_frontend = require("./controllers/frontend_controller.js");
var routes_auth = require("./controllers/auth_controller.js");




//session 
app.use(session({
  secret: "nicole",
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 7200000
  }
}))

app.use(routes_paws);
app.use(routes_frontend);
app.use(routes_auth);

var PORT = process.env.PORT || 3030;
db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App now listening on port:", PORT);
    
  });

});
