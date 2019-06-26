const objectId = require("mongodb").ObjectId;

function getAll(req, res) {
    let email = req.body.email;
    req.db.collection('events').find({
            members: { $ne: [email] }
        }).toArray()
        .then(function(results) {
            if (results == null) {
                res.status(501).send("No events found");
            }
            res.status(200).send(results);
        }).catch(function(error) {
            res.status(500).send("Not found");
        });
}

module.exports = {
    getAll
}