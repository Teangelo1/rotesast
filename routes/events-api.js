// Requiring our Events model
const db = require("../models");
const { writeFileSync } = require("fs");
// const fs = require('fs')
const ics = require("ics");

// Routes
// =============================================================
module.exports = (app) => {
  console.log("Helllllllllloooooooooo");
  app.get("/api/viewEvent", (req, res) => {
    db.Events.findAll({}).then((dbEvents) => res.json(dbEvents));
  });

  // POST route for saving a new post
  app.post("/api/events", (req, res) => {
    console.log("events-api.js app post route fired");
    console.log(req.body);
    // steve commented this out until the consolelog shows the object ready to push into data base. 3-21-21-6pm Start
    db.Events.create({
      title: req.body.title,
      // assignee: req.body.assignee,
      start_date: req.body.start_date,
      start_time: req.body.start_time,
      duration: req.body.duration,
      // end_date: req.body.end_date,
      repeat_cycle: req.body.repeat_cycle,
      description: req.body.description
      // steve commented this out until the consolelog shows the object ready to push into data base. 3-21-21-6pm Stop
    });
  });
  //.then((dbEvents) => res.json(dbEvents)); // had to comment this out to get it to load.. Not sure what is wrong.

  // Get Route for ICS export ------------------------------------Start
  // Get route for retrieving a single post
  app.get("/api/events/:id", (req, res) => {
    db.Events.findOne({
      //findOne
      // plain: true,
      where: {
        id: req.params.id
      }
    }).then((dbEvents) => {
      // console.log(dbEvents)
      const newDBevent = {
        title: dbEvents.title,
        start_date: dbEvents.start_date,
        start_time: dbEvents.start_time,
        duration: dbEvents.duration,
        repeat_cycle: dbEvents.repeat_cycle,
        description: dbEvents.description
      };
      console.log(newDBevent);
      // ics file creation crap -----------------------------start
      const dbXevent = newDBevent;
      //Converts string to temp variable
      let TempDuration = parseInt(dbXevent.duration);
      // saves object to temp variable
      let TempRepeatCycle = dbXevent.repeat_cycle;
      // Creates default temp variable to push into ICS
      let TempXrepeatCycle = "Default";
      // Saves object to temp variable
      let TempStartDate = dbXevent.start_date;
      // Strips the year out of temp variable and saves in just year variable
      let TempStartDate_year = TempStartDate.substr(0, 4);
      // Strips the month out of temp variable and saves in just a month variable
      let TempStartDate_Month = TempStartDate.substr(5, 2);
      // Strips the day out of the temp variable and saves in just a day variable
      let TempStartDate_Day = TempStartDate.substr(8, 2);
      // Saves object time data in temp variable
      let TempTime = dbXevent.start_time;
      // Strips the hour out of the temp variable and saves in seperate variable
      let TempTimeHour = parseInt(TempTime.substr(0, 2));
      // Strips the minute out of the temp variable and saves in seperate variable
      let TempTimeMin = parseInt(TempTime.substr(3, 2));

      // Switch statement to convert database information into ICS format
      switch (TempRepeatCycle) {
        case "0":
          TempXrepeatCycle = "";
          break;

        case "1":
          TempXrepeatCycle = "FREQ=DAILY;INTERVAL=1";
          break;

        case "2":
          TempXrepeatCycle = "FREQ=DAILY;INTERVAL=2";
          break;

        case "7":
          TempXrepeatCycle = "FREQ=WEEKLY;INTERVAL=1";
          break;

        case "30":
          TempXrepeatCycle = "FREQ=MONTHLY;INTERVAL=1";
          break;

        case "60":
          TempXrepeatCycle = "FREQ=MONTHLY;INTERVAL=2";
          break;

        case "90":
          TempXrepeatCycle = "FREQ=MONTHLY;INTERVAL=3";
          break;

        case "120":
          TempXrepeatCycle = "FREQ=MONTHLY;INTERVAL=4";
          break;

        case "150":
          TempXrepeatCycle = "FREQ=MONTHLY;INTERVAL=5";
          break;

        case "180":
          TempXrepeatCycle = "FREQ=MONTHLY;INTERVAL=6";
          break;

        case "365":
          TempXrepeatCycle = "FREQ=YEARLY;";
          break;
      }

      // For fun created a second object from the above variables.
      // Not actually needed you could put the above variables into the createevent statement below
      let event = {
        title: dbXevent.title,
        description: dbXevent.description,
        busyStatus: "BUSY",
        start: [
          TempStartDate_year,
          TempStartDate_Month,
          TempStartDate_Day,
          TempTimeHour,
          TempTimeMin
        ], //YYYY, Month, Day, hour, min
        duration: { minutes: TempDuration }, //duration
        alarms: [
          {
            action: "display",
            trigger: { hours: 2, minutes: 30, before: true }
          }
        ],
        recurrenceRule: TempXrepeatCycle
      };

      // CREATE ICS FILE ___________________________________________________________START
      ics.createEvent(
        {
          title: event.title,
          description: event.description,
          busyStatus: event.busyStatus,
          start: event.start, //YYYY, Month, Day, hour, min
          duration: event.duration, //duration
          alarms: event.alarms,
          recurrenceRule: event.recurrenceRule
        },
        (error, value) => {
          if (error) {
            console.log(error);
          }
          writeFileSync(`${__dirname}/${event.title}.ics`, value);
          //send file to front end for download.
          res.sendFile(`${__dirname}/${event.title}.ics`);
          //delete file on server side.
        }
      );
      // CREATE ICS FILE ___________________________________________________________STOP
    });
  });
  // ics file creation crap -----------------------------stop

  // Get Route for ICS export ------------------------------------Stop

  // DELETE route for deleting posts
  app.delete("/api/events/:id", (req, res) => {
    db.Events.destroy({
      where: {
        id: req.params.id
      }
    }).then((events) => res.json(events)); // steve 3-21-21 -824pm changed from dbevents to events
  });

  // PUT route for updating posts
  app.put("/api/events", (req, res) => {
    db.Events.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then((events) => res.json(events)); // steve 3-21-21 -824pm changed from dbevents to events
  });
};
