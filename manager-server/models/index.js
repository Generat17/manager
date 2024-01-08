const dbConfig = require("../config/db.config.js");

const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.services = require("./service.model.js")(sequelize, Sequelize);
db.passwords = require("./password.model.js")(sequelize, Sequelize);
db.movies = require("./movie.model.js")(sequelize, Sequelize);

db.services.hasMany(db.passwords);

module.exports = db;