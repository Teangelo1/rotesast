// Requiring path to so we can use relative routes to our HTML files
const path = require("path");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");
const db = require("../models");

module.exports = function(app) {
  app.get("/", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/login", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });
  

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, (req, res) => {
    res.render("index");
  });

  app.get("/addEvent", isAuthenticated, (req, res) => {
    res.render("addevent");
  });

  app.get("/viewEvent", isAuthenticated, (req, res) => {
    db.Events.findAll({}).then((dbEvents) => {
      console.log(JSON.parse(JSON.stringify(dbEvents)))
      res.render("viewEvents",{
  
      events: JSON.parse(JSON.stringify(dbEvents))
    })});
    
  });

  app.get("/loadpage", isAuthenticated, (req, res) => {
    res.render("index");
  });

  app.get("/logout", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

};


