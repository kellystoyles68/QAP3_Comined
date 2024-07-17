//to set up project in terminal
//npm init -y
//npm install express method-override express-ejs-layouts pg body-parser

//Import modules
//import express from library
const express = require("express");
//const router = express.Router();
//get express layout
//const expressLayouts = require("express-ejs-layouts");
//import path module to work with file and directory paths
//const path = require("path");
//import method override
const methodOverride = require("method-override");
//import Postgres
//const { Pool } = require("pg");
//import body Parser
//const bodyParser = require("body-parser");

//import router
//const indexRouter = require("./index");
//const bookRoutes = require("./routes/books");
//const bookModel = require("./models/bookModel");

//create server
const app = express();

//set up our view engine
app.set("view engine", "ejs");
//set our vews directory
//app.set("views", path.join(__dirname, "views"));
//set up our express layouts
//app.use(expressLayouts);
//set up our public folder
app.use(express.static("public"));
//set up our middleware
app.use(express.urlencoded({ extended: true }));
//set up our method override
app.use(methodOverride("_method"));
//set up the process of JSON information (used with fetch and API)
//app.use(express.json());
//set up our middleware for parsing
//app.use(bodyParser.urlencoded({ entednded: true }));
// set up parsing
//app.use(bodyParser.json());

// Define your routes here
//router.get("/books", async (req, res) => {
// try {
//   const books = await bookModel.getBook();
//   res.json(books);
// } catch (err) {
//   res.status(500).send(err.message);
//  }
//});

//define routes
//router.use("/books", bookRoutes);

//set our app to use our router
//app.use("/", indexRouter);
//listen from port
//const PORT = process.env.PORT || 3000;
//app.listen(process.env.PORT || 3000, () => console.log("Server Started"));

//module.exports = router;

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("about", (req, res) => {
  res.render("about.ejs");
});

const booksRouter = require("./routes/books");
app.use("/books", booksRouter);
