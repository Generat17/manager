const express = require("express");
const passwordRouter = require('./routes/password.routes');
const serviceRouter = require('./routes/service.routes');
const movieRouter = require('./routes/movie.routes');

const cors = require("cors");
const db = require("./models/index");

const app = express();

let corsOptions = {
    origin: "http://192.168.1.100:3006"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(express.json());

// If the table exists but does not match the model, use the option {force: true}
// db.sequelize.sync({force: true})
db.sequelize.sync()
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });

app.use('/api/service/', serviceRouter)
app.use('/api/password/', passwordRouter)
app.use('/api/movie/', movieRouter)

// set port, listen for requests
const PORT = process.env.PORT || 8086;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});