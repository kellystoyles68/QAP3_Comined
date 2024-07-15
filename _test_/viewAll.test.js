// test1 - I want to see a webpage with all the books from the database.
const request = require("supertest");
const express = require("express");
const { Pool } = require("pg");
const indexRouter = require("../routes/index");
const { getBook } = require("./models/bookModel");

jest.mock("pg", () => {
  const mPool = {
    connect: jest.fn(),
    query: jest.fn(),
    on: jest.fn(),
  };
  return { Pool: jest.fn(() => mPool) };
});

const app = express();
app.use(express.json());
app.use("/", indexRouter);

describe("GET /books", () => {
  it("should list all books", async () => {
    const pool = new Pool();
    pool.query.mockResolvedValue({
      rows: [
        { ISBN: 1, title: "Book 1", author: "Author 1" },
        { ISBN: 2, title: "Book 2", author: "Author 2" },
      ],
    });

    const res = await request(app).get("/books");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual([
      { ISBN: 1, title: "Book 1", author: "Author 1" },
      { ISBN: 2, title: "Book 2", author: "Author 2" },
    ]);
  });
});
