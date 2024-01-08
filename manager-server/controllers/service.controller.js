const db = require("../models");
const {QueryTypes} = require("sequelize");
const {query} = require("express");
const Service = db.services;
const sequelize = db.sequelize

// Create and Save a new Service
exports.createService = (req, res) => {

    // Validate request
    if (!req.body.name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Service
    const service = {
        name: req.body.name,
    };

    // Save Service in the database
    Service.create(service)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Service."
            });
        });
};

// Get Services from the database.
exports.getServices = (req, res) => {

    let query = `SELECT * FROM services`

    sequelize.query(query, {
        model: Service,
        mapToModel: true,
        type: QueryTypes.SELECT
    })
        .then((services)=> {res.send(services)})
        .catch(err => {res.status(500).send({
        message:
            err.message || "Some error occurred while get the Services."
    });});
};

// Update a Service by the id in the request
exports.updateService = (req, res) => {
    const id = req.params.id;

    Service.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Service was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Service with id=${id}. Maybe Service was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Service with id=" + id
            });
        });
};

// Delete a Service with the specified id in the request
exports.deleteService = (req, res) => {
    const id = req.params.id;

    Service.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Service was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Service with id=${id}. Maybe Service was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Service with id=" + id
            });
        });
};
