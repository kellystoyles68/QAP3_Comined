//setting up our first route
const express = require("express");
const router = express.Router();

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
router.get("/", (req, res) => {
  res.json(extra_books);
});

//Post a new book
router.post("/", (req, res) => {
  const newBook = req.body;
  newBook.id = extra_books.length + 1;
  extra_books.push(newBook);
  res.status(201).json(newBook);
});

//Put (Update) a book
router.put("/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const updatedBook = req.body;
  extra_books = extra_books.map((book) => {
    book.id === book.Id ? updatedBook : book;
    res.json(updatedBook);
  });
});

//Delete a book
router.delete("/:ISBN", (req, res) => {
  const ISBN = req.params.ISBN;
  extra_books = extra_books.filter((book) => book.ISBN !== ISBN);
  res.status(204).end();
});

module.exports = router;
