'use strict';

const { Sequelize, Op } = require('sequelize');

const sequelize = new Sequelize(process.env.MYSQL_DB_NAME, process.env.MYSQL_DB_USERNAME, process.env.MYSQL_DB_PASSWORD, {
    host: process.env.MYSQL_DB_HOST,
    dialect: 'mysql',
    logging: false
});

sequelize.authenticate().then(function (err) {
    console.log('Connection to MySQL has been established successfully!!');
}).catch(function (err) {
    console.log('Unable to connect to the database:', err);
});

const db = {};

db.Sequelize = Sequelize;
db.Op = Op;
db.sequelize = sequelize;

db.Activities = require("./activitySchema")(sequelize, Sequelize);

Object.keys(db).forEach(function (modelName) {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize.sync({ force: false });

module.exports = db;