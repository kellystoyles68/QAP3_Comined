//test2 - i want to see if the page will allow me to add a new book to the database

const { Pool } = require("pg");
const { createBook, getBook } = require("./models/bookModel");

// Mock database connection
const pool = new Pool({
  user: "postgres",
  password: "password",
  host: "localhost",
  port: 5432,
  database: "My_Florida_Library",
});

describe("Book Model", () => {
  beforeAll(async () => {
    // Ensure the database is clean before running tests
    await pool.query("DELETE FROM books WHERE ISBN = '1234567890123'");
  });

  afterAll(async () => {
    // Clean up the database after tests
    await pool.query("DELETE FROM books WHERE ISBN = '1234567890123'");
    await pool.end();
  });

  test("should add a new book to the database", async () => {
    const newBook = {
      ISBN: "1234567890123",
      title: "Test Book",
      author: "Test Author",
      genre: "Test Genre",
      year_published: 2023,
    };

    // Call the createBook function
    await createBook(newBook);

    // Verify the book was added
    const result = await getBook();
    const addedBook = result.find((book) => book.isbn === newBook.ISBN);

    expect(addedBook).toBeDefined();
    expect(addedBook.title).toBe(newBook.title);
    expect(addedBook.author).toBe(newBook.author);
    expect(addedBook.genre).toBe(newBook.genre);
    expect(addedBook.year_published).toBe(newBook.year_published);
  });
});
