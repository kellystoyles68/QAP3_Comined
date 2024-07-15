//test4 -i want to be able to update any information on an existing book

const { Pool } = require("pg");
const { getBooks } = require("../models/bookModel");

// Mock the database connection
jest.mock("pg", () => {
  const mPool = {
    query: jest.fn(),
    connect: jest.fn(),
    on: jest.fn(),
  };
  return { Pool: jest.fn(() => mPool) };
});

describe("updateBook", () => {
  let pool;

  beforeAll(() => {
    pool = new Pool();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should update a book in the database", async () => {
    const ISBN = "139781496732927";
    const book = {
      title: "Updated Title",
      author: "Updated Author",
      genre: "Updated Genre",
      year_published: 2022,
    };

    pool.query.mockResolvedValueOnce({ rows: [] });

    const result = await updateBook(ISBN, book);

    expect(pool.query).toHaveBeenCalledWith(
      "UPDATE books SET title = $1, author = $2, genre = $3, year_published = $4 WHERE ISBN = $5",
      [book.title, book.author, book.genre, book.year_published, ISBN]
    );
    expect(result).toEqual([]);
  });
});
