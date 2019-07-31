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

function addEvent(req, res) {
    let event = { _id: new objectId(), type: req.body.type, created_at: new Date(), completed: false, members: [], fixtures: [] };
    console.log('event',event);
    req.db.collection('events').insertOne(event)
        .then(function(result) {
            if (result == null) {
                res.status(501).send("No result");
            }
            res.status(200).send(event);
        }).catch(function(error) {
            res.status(500).send("Not found");
        });
}

module.exports = {
    getAll,
    addEvent
}