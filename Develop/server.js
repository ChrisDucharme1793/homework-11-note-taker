// Dependencues
//npm packages or modules that application will use
var express = require("express");

//Tells node that we are creating an express server
var app = express();

// Sets a port to listen to
var PORT = process.env.PORT || 3000;

//Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"))
app.use("/api", apiRoutes);
app.use("*", htmlRoutes);

//Routes a map for our server on how to responed when users visit or request data for urls(seems to always be API and HTML routes)
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

//Starts server to listen
app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});