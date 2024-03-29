const objectId = require("mongodb").ObjectId;
const md5 = require('md5');
const mailer = require('./mailer.js');

function signin(req, res) {
    req.db.collection('users').findOne({ email: req.body.email, password: md5(req.body.password) })
        .then(function(result) {
            if (result == null) {
                res.status(501).send("No results found");
            }
            result.emailHash = md5(result.email);
            res.status(200).send(result);
        }).catch(function(error) {
            res.status(500).send("Not Found error");
        });
}

function signup(req, res) {
    let user = { _id: new objectId(), email: req.body.email, name: req.body.name, password: md5(req.body.password), created_at: new Date(), form: 0, accountVerified: false, emailLinkDate: new Date() };
    //enter validations here
    req.db.collection('users').insertOne(user)
        .then(function(result) {
            if (result == null) {
                res.status(501).send("No result");
            }
            mailer.mail(user.email);
            user.emailHash = md5(user.email);
            res.status(200).send(user);
        }).catch(function(error) {
            res.status(500).send("Not Found");
        });
}

function getAll(req, res) {
    let email = req.body.email;
    req.db.collection('users').find({
            email: { $ne: email }
        }).toArray()
        .then(function(result) {
            if (result == null) {
                res.status(501).send("No result");
            }
            res.status(200).send(result);
        }).catch(function(error) {
            res.status(500).send("Not found");
        });
}

function verifyAccount(req, res) {
    let email = req.params.email;
    req.db.collection('users').update({
        email: email
    }, {
        accountVerified: true
    }, {
        upsert: false
    })
}

module.exports = {
    signin,
    signup,
    getAll,
    verifyAccount
}