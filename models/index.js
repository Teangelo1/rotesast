// install notes: npm install --save-dev sequelize-cli
// npm install --save sequelize
// npm install --save mysql2

//required dependancies
const fs = require('fs');//require FS
const path = require('path');//the directory tree from root up to current location.
const Sequelize = require('sequelize');//require sequelize, this is part of the connection, creating a Sequelize instance.

const basename = path.basename(module.filename);//saves file name into basename from directory tree.
const env = process.env.NODE_ENV || 'development';
const config = require(`${__dirname}/../config/config.js`)[env];//constant with connection parameter from config.js
const db = {};// don't know what this empty database is for
let sequelize;// is this an empty instance?

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  sequelize = new Sequelize( //passing connection parameters from config.js
    config.database,
    config.username,
    config.password,
    config
  );
}


// try {
//   await sequelize.authenticate();
//   console.log('Connection has been established successfully.');
// } catch (error) {
//   console.error('Unable to connect to the database:', error);
// }

// this is where am_events.js is linked in... 







// fs.readdirSync(__dirname)
//   .filter((file) => {
//     return (
//       file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
//     );
//   })
//   .forEach((file) => {
//     const model = sequelize.import(path.join(__dirname, file));
//     db[model.name] = model;
//   });

// Object.keys(db).forEach((modelName) => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
//everything above this line was copied from week 14 activity 14 authors
//************************************************************************************************************************/
//everything below this line is from before issue 2 branch work
// // 'use strict';

// var fs = require('fs');
// var path = require('path');
// var Sequelize = require('sequelize');
// var basename = path.basename(module.filename);
// var env = process.env.NODE_ENV || 'development';
// var config = (require(__dirname + '/../config/config.js'))[env];
// var db = {};
// console.log(config);

// if (config.use_env_variable) {
//   var sequelize = new Sequelize(process.env[config.use_env_variable]);
// } else {
//   var sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

// fs.readdirSync(__dirname)
//   .filter(function (file) {
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//   })
//   .forEach(function (file) {
//     var model = sequelize['import'](path.join(__dirname, file));
//     db[model.name] = model;
//   });

// Object.keys(db).forEach(function (modelName) {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// // exporting database

// module.exports = db;
