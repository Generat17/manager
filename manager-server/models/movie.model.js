module.exports = (sequelize, Sequelize) => {
    const Movie = sequelize.define("movie", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        isMovie: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
        isViewed: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        year: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        description: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        seasons: {
            type: Sequelize.STRING,
            allowNull: true,
        },
    });

    return Movie;
};