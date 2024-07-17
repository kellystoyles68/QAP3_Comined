var router = require("express").Router();

if (DEBUG) {
  console.log("ROUTE: /api/books)");
}

// http://localhost:3000/api/books/
const booksRouter = require("./books");
router.use("/books", booksRouter);

module.exports = router;
