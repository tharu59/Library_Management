const express = require("express");
const { books } = require("../data/books.json");
const { users } = require("../data/users.json");

const router = express.Router();

/**
 * Route: /books
 * Method: GET
 * Description:Getting all books
 * Access: public
 * Parameters: NONE
 */

router.get("/", (req, res) => {
  res.status(202).json({
    success: true,
    message: "Got All the books",
    data: books,
  });
});

/**
 * Route: /books/issued
 * Method: GET
 * Description:Get all issued books
 * Access: public
 * Parameters: None
 */

// by-user
// --/user

router.get("/issued/by-user", (req, res) => {
  const usersWithTheIssuedBook = users.filter((each) => {
    if (each.issuedBook) return each;
  });
  const issuedBooks = [];

  usersWithTheIssuedBook.forEach((each) => {
    const book = books.find((book) => book.id === each.issuedBook);

    book.issuedBy = each.name;
    book.issuedDate = each.issuedDate;
    book.returnDate = each.returnDate;

    issuedBooks.push(book);
  });
  if (issuedBooks.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No Book Have Been Issued Yet...",
      data: issuedBooks,
    });
  }
  return res.status(200).json({
    success: true,
    message: "Users with the Issued Books",
    data: issuedBooks,
  });
});

/**
 * Route: /books/:id
 * Method: GET
 * Description:Get books by their user id--finding a book
 * Access: public
 * Parameters: id
 */

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const book = books.find((each) => each.id === id);
  if (!book) {
    return res.status(404).json({
      success: false,
      message: "Book not found",
      // data: books,
    });
  }
  return res.status(200).json({
    success: true,
    message: "Found the Book by their id ",
    data: book,
  });
});

module.exports = router;
