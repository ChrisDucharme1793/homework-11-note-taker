//Linking our routes to data sources(I believe data sources typically holds arrays or info on table-data or lists)

var fs = require("fs");
var db;
fs.readFile("db/db.json", "utf8", function (err, data) {
    db = JSON.parse(data)
})

//Get
// when a user visits a link
// they are shown a JSON of the data in the table)
module.exports = function (app) {
    app.get("/api/notes", function (req, res) {
        console.log("api.get")
        res.json(db);
    });

//Post 
//  User fills out a reservation request... data is then sent to the server
//  the server saves the data to array)

    app.post("/api/notes", function (req, res) {
        console.log("app.post", req.body)

        var newID
        if (db.length === 0) {
            newID = 1
        } else {
            newID = parseInt(db[db.length - 1].id) + 1
        }
        req.body.id = newID
        db.push(req.body)

        fs.writeFile("db/db.json", JSON.stringify(db), function (err, data) {
            res.json(db)
        })
    });
    // I added this below code so you could clear out the table while working with the functionality.
    // Don"t worry about it!

    app.delete("/api/notes/:id", function (req, res) {
        console.log("app.put", req.params.id)

        // how we can delete
        var newDB = []
        for (var i = 0; i < db.length; i++) {
            if (db[i].id !== parseInt(req.params.id)) {
                newDB.push(db[i])
            }}
        db = newDB
        fs.writeFile("db/db.json", JSON.stringify(db), function (err, data) {
            res.json(db)

        })

    });
    ;
};
