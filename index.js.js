//to set up project in terminal
//npm init -y
//npm i express ejs express-ejs-layouts
//npm i --save-dev nodemon
//npm pg body-parser
//npm method-override

//Import modules
//import express from library
const express = require("express");
//get express layout
const expressLayouts = require("express-ejs-layouts");
//import path module to work with file and directory paths
const path = require("path");
//import method override
const methodOverride = require("method-override");
//import Postgres
const { Pool } = require("pg")
//import body Parser
const bodyParser = require("body-parser");

//import router
const indexRouter = require("./routes/index");

//create server
const app = express();

//set up our view engine
app.set("view engine", "ejs");
//set our vews directory
app.set("views", path.join(__dirname, "views"));
//set the layouts
app.set("layout", "layouts/layout");

//set up our express layouts
app.use(expressLayouts);
//set up our public folder
app.use(express.static("Public"));
//set up our middleware
app.use(express.urlencoded({ extended: true }));
//set up our method override
app.use(methodOverride("_method"));
//set up the process of JSON information (used with fetch and API)
app.use(express.json());
// ser up parsing
app.use (bodyParser.json());
////set up our middleware for parsing
app.use (bodyParser.urlendocded ({entednded:true}));

//define routes
constbookRoutes = require(./routes/books)
app.use("/books", bookRoutes);

//set up our database connection
const pool = new Pool({
  user: "postgres",
  password: "password",
  host: "localhost",
  port: 5432,
  database: "My_Florida_Library",
});

//checking if coonection is false , send error message
pool.on("error", (err, client) => {
  console.error("Unexpected Error", err);
  process.exit(-1);
});
//on connection, console message that you are connected to the database
pool.connect((err, client, release) => {
  if (err) {
    return console.error("Error acquiring client", err.stack);
  }
  console.log("Connected to PostgresSQL");
  release();
});

//set our app to use our router
app.use("/", indexRouter);
//listen from port
const PORT = preocess.env.PORT || 3000;
app.listen(process.env.PORT || 3000, () => console.log("Server Started"));




