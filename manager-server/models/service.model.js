module.exports = (sequelize, Sequelize) => {
    const Service = sequelize.define("service", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    return Service;
};