const db = require("../models");
const {QueryTypes} = require("sequelize");
const Password = db.passwords;
const sequelize = db.sequelize

exports.createPassword = (req, res) => {

    // Validate request
    if (!req.body.login || !req.body.password || !req.body.serviceId) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Password
    const password = {
        login: req.body.login,
        password: req.body.password,
        description: req.body.description,
        serviceId: req.body.serviceId
    };

    // Save Password in the database
    Password.create(password)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Password."
            });
        });
}

exports.getPasswords = (req, res) => {
    const id = req.params.id;

    sequelize.query(`SELECT * FROM passwords WHERE \"serviceId\" = ${id}`, {
        model: Password,
        mapToModel: true,
        type: QueryTypes.SELECT
    })
        .then((passwords)=> {res.send(passwords)})
        .catch(err => {res.status(500).send({
            message:
                err.message || "Some error occurred while get the Passwords."
        });});
}

exports.updatePassword = (req, res) => {
    const id = req.params.id;

    Password.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Password was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Password with id=${id}. Maybe Password was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Password with id=" + id
            });
        });
}

exports.deletePassword = (req, res) => {
    const id = req.params.id;

    Password.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Password was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Password with id=${id}. Maybe Password was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Password with id=" + id
            });
        });
}