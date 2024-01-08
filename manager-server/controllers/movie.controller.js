const db = require("../models");
const {QueryTypes} = require("sequelize");
const {query} = require("express");
const Movie = db.movies;
const sequelize = db.sequelize

// Create and Save a new Movie
exports.createMovie = (req, res) => {

    // Validate request
    if (!req.body.name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Movie
    const movie = {
        isMovie: req.body.isMovie,
        isViewed: req.body.isViewed,
        name: req.body.name,
        year: req.body.year,
        description: req.body.description,
        seasons: req.body.seasons,
    };

    // Save Service in the database
    Movie.create(movie)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Movie."
            });
        });
};

// Get Movies from the database.
exports.getMovies = (req, res) => {

    let query = `SELECT * FROM movies`

    sequelize.query(query, {
        model: Movie,
        mapToModel: true,
        type: QueryTypes.SELECT
    })
        .then((movies)=> {res.send(movies)})
        .catch(err => {res.status(500).send({
        message:
            err.message || "Some error occurred while get the Movies."
    });});
};

// Update a Movie by the id in the request
exports.updateMovie = (req, res) => {
    const id = req.params.id;

    Movie.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Movie was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Movie with id=${id}. Maybe Movie was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Movie with id=" + id
            });
        });
};

// Delete a Movie with the specified id in the request
exports.deleteMovie = (req, res) => {
    const id = req.params.id;

    Movie.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Movie was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Movie with id=${id}. Maybe Movie was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Movie with id=" + id
            });
        });
};
