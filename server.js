const express = require('express');
const bodyParser = require('body-parser');
const mongo = require('mongodb');
const cookieParser = require('cookie-parser');
const md5 = require('md5');
const path = require('path');
const nodemailer = require('nodemailer');
const crypto = require('crypto-js');

const app = express();

const dbName = 'football-manager';
const url = "mongodb://localhost:27017";
var db;

mongo.MongoClient.connect(url, { useNewUrlParser: true }, function(err, Client) {
    if (err) {
        console.log(err);
    }
    console.log("Successfully connected to database.");
    db = Client.db(dbName);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
    req.db = db;
    next();
});

//load modules here.
const users = require('./modules/users.js');
const events = require('./modules/events.js');
const mailer = require('./modules/mailer.js');


//API
app.post("/api/users/signin", users.signin);
app.post("/api/users/signup", users.signup);
app.post("/api/users/all", users.getAll);
app.get("/api/users/verify/:email", users.verifyAccount);

//events
app.post("/api/events/all", events.getAll);
app.post("/api/events/add", events.addEvent);
app.post("/api/event/:id",events.getEvent);

//Server running
app.listen(3000, function() {
    console.log("Server is running at port 3000");
});