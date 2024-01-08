module.exports = (sequelize, Sequelize) => {
    const Password = sequelize.define("password", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        login: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        description: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        serviceId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'services',
                key: 'id'
            }
        }
    });

    return Password;
};