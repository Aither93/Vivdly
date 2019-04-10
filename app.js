const express = require("express");
const app = express();
const error = require("./middleware/error");
const mongoose = require("mongoose");
const Genre = require("./models/Genre").Genre;
const Customer = require("./models/customer");
const helemt = require("helmet");
const config = require("config");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const users = require("./routes/users");
const auth = require("./routes/auth");
const startupDebugger =  require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");
const port = process.env.PORT || 3000;
if(!config.get("jwtPrivateKey")){
    console.error("FATAL ERROR: jwtPrivateKey is not defiened");
    process.exit(1);
}

mongoose.connect("mongodb://localhost/vivdly");

app.set("view engine", "pug");
app.set("views", "./views");
app.use(express.json());
app.use(helemt());
app.use(express.static("public"));
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/login", auth);
app.use(error);
app.get("/", (req, res) => {
    res.render("index", {message: "Hello World"});
})


app.listen (port, ()=> console.log(`listening to ${port}`));