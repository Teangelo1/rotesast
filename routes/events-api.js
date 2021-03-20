// Requiring our Events model
const db = require("../models");

// Routes
// =============================================================
module.exports = (app) => {
  // GET route for getting all of the posts
  app.get("api/events/", (req, res) => {
    db.Events.findAll({}).then((dbEvents) => res.json(dbEvents));
  });
  //don't think we are doing this but will save here incase
  //   // Get route for returning posts of a specific category
  //   app.get('/api/events/category/:category', (req, res) => {
  //     db.Post.findAll({
  //       where: {
  //         category: req.params.category,
  //       },
  //     }).then((dbEvents) => {
  //       res.json(dbEvents);
  //     });
  //   });
  //dont think we will use this but just incase
  //   // Get route for retrieving a single post
  //   app.get('/api/events/:id', (req, res) => {
  //     db.Events.findOne({
  //       where: {
  //         id: req.params.id,
  //       },
  //     }).then((dbEvents) => res.json(dbEvents));
  //   });

  // POST route for saving a new post
  app.post("/api/events", (req, res) => {
    console.log(req.body);
    db.Events.create({
      title: req.body.title,
      // assignee: req.body.assignee,
      start_date: req.body.start_date,
      start_time: req.body.start_time,
      duration: req.body.duration,
      // end_date: req.body.end_date,
      repeat_cycle: req.body.repeat_cycle,
      description: req.body.description
    }).then((dbEvents) => res.json(dbEvents));
  });

  // DELETE route for deleting posts
  app.delete("/api/events/:id", (req, res) => {
    db.Events.destroy({
      where: {
        id: req.params.id,
      },
    }).then((dbEvents) => res.json(dbEvents));
  });

  // PUT route for updating posts
  app.put("/api/events", (req, res) => {
    db.Events.update(req.body, {
      where: {
        id: req.body.id,
      },
    }).then((dbEvents) => res.json(dbEvents));
  });
};
