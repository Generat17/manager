// connection settings to DataBase
module.exports = {
    HOST: '192.168.1.100',
    USER: 'postgres',
    PASSWORD: 'sweden1951',
    DB: 'postgres',
    dialect: 'postgres',
    operatorsAliases: 0,
    pool: {
        max: 5,
        min: 0,
        acquire: 3000,
        idle: 10000
    }
};