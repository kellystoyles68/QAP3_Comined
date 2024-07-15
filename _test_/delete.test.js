//test3 - check to see if i can delete a book from the database
const { Pool } = require("pg");
const { deleteBook } = require("../models/bookModel");

// Mock the database connection
jest.mock("pg", () => {
  const mPool = {
    query: jest.fn(),
    connect: jest.fn(),
    on: jest.fn(),
  };
  return { Pool: jest.fn(() => mPool) };
});

describe("deleteBook", () => {
  let pool;

  beforeAll(() => {
    pool = new Pool();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should delete a book from the database", async () => {
    const ISBN = "1234567890123";

    pool.query.mockResolvedValueOnce({ rows: [] });

    const result = await deleteBook(ISBN);

    expect(pool.query).toHaveBeenCalledWith(
      "DELETE FROM books WHERE ISBN = $1",
      [ISBN]
    );
    expect(result).toEqual([]);
  });
});
