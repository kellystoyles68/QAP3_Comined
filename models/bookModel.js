const mysql = require("mysql");
const util = require("util");
const express = require("express");
const router = express.Router();
const { Pool } = require("pg");

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

//setting up our query function
//pool.query = util.promisify(pool.query);

const AllExtraBooks = async () => {
  return await pool.query("SELECT * FROM  books");
};

//Mock Data array
let extra_books = [
  {
    ISBN: "139781728243412",
    title: "The Princess Stakes",
    author: "Amalie Howard",
    genre: "romance",
    year_published: 2021,
  },

  {
    ISBN: "139781496732928",
    title: "Rules for Heiresses",
    author: "Amelia Howard",
    genre: "thriller",
    year_published: 2021,
  },
];

//Get all books
const getBook = async () => {
  const res = await pool.query("SELECT * FROM books");
  return res.rows;
};

//Create/Post a new book
const createBook = async (book) => {
  const { ISBN, title, author, genre, year_published } = book;
  const res = await pool.query(
    "INSERT INTO books (ISBN, title, author, genre, year_published) VALUES ($1, $2, $3, $4, $5)",
    [ISBN, title, author, genre, year_published]
  );
  return res.rows;
};

//Put (Update) a book
const updateBook = async (ISBN, book) => {
  const { title, author, genre, year_published } = book;
  const res = await pool.query(
    "Update books set title = $1, author = $2, genre = $3, year_published = $4 WHERE ISBN = $5",
    [title, author, genre, year_published, ISBN]
  );
  return res.rows;
};

//Delete a book
const deleteBook = async (ISBN) => {
  const res = await pool.query("Delete from books where ISBN = $1", [ISBN]);
  return res.rows;
};

module.exports = {
  getBook,
  createBook,
  updateBook,
  deleteBook,
  AllExtraBooks,
};
