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

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;