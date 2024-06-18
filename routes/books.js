const express = require("express");
const {
  getAllBooks,
  getSingleBookById,
  getAllIssuedBooks,
} = require("../controllers/book-controller");
const { books } = require("../data/books.json");
const { users } = require("../data/users.json");

// const BookModal = require("../modals/book-modal");
// const UserModal = require("../modals/user-modal");

const router = express.Router();

const [UserModal, BookModal] = require("../modals/index");

/**
 * Route: /books/:id
 * Method: GET
 * Description:Get books by their user id--finding a book
 * Access: public
 * Parameters: id
 */

router.get("/:id", getSingleBookById);

// router.get("/:id", (req, res) => {
//   const { id } = req.params;
//   const book = books.find((each) => each.id === id);
//   if (!book) {
//     return res.status(404).json({
//       success: false,
//       message: "Book not found",
//       // data: books,
//     });
//   }
//   return res.status(200).json({
//     success: true,
//     message: "Found the Book by their id ",
//     data: book,
//   });
// });

/**
 * Route: /books
 * Method: GET
 * Description:Getting all books
 * Access: public
 * Parameters: NONE
 */

router.get("/", getAllBooks);

// router.get("/", (req, res) => {
//   res.status(202).json({
//     success: true,
//     message: "Got All the books",
//     data: books,
//   });
// });

/**
 * Route: /books/issued
 * Method: GET
 * Description:Get all issued books
 * Access: public
 * Parameters: None
 */

// by-user
// --/user

router.get("/issued/by-user", getAllIssuedBooks);

// router.get("/issued/by-user", (req, res) => {
//   const usersWithTheIssuedBook = users.filter((each) => {
//     if (each.issuedBook) return each;
//   });
//   const issuedBooks = [];

//   usersWithTheIssuedBook.forEach((each) => {
//     const book = books.find((book) => book.id === each.issuedBook);
//     // both are same syntax
//     // const book = books.find((book) => {
//     //   return book.id === each.issuedBook;
//     // });

//     book.issuedBy = each.name;
//     book.issuedDate = each.issuedDate;
//     book.returnDate = each.returnDate;

//     issuedBooks.push(book);
//   });
//   if (issuedBooks.length === 0) {
//     return res.status(404).json({
//       success: false,
//       message: "No Book Have Been Issued Yet...",
//       data: issuedBooks,
//     });
//   }
//   return res.status(200).json({
//     success: true,
//     message: "Users with the Issued Books",
//     data: issuedBooks,
//   });
// });

/**
 * Route: /
 * Method: post
 * Description:Adding a new book
 * Access: public
 * Parameters: None
 * Data : id, name,author, genre, price,publisher
 */

router.post("/", (req, res) => {
  const { data } = req.body;

  if (!data) {
    return res.status(400).json({
      success: false,
      message: "No Data to add a book",
    });
  }
  const book = books.find((each) => each.id === data.id);
  if (book) {
    return res.status(400).json({
      success: false,
      message: "Id Already Exists",
    });
  }
  const allBooks = { ...books, data };
  return res.status(201).json({
    success: true,
    message: "Book Added Successfully",
    data: allBooks,
  });
});

/**
 * Route: /:id
 * Method: put
 * Description:updating a id  by is id
 * Access: public
 * Parameters: Id
 * Data : id, name,author, genre, price,publisher
 */

router.put("/updateBook/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  const book = books.find((each) => each.id === id);

  if (!book) {
    return res.status(404).json({
      success: false,
      message: "Book Not Found for this ID",
    });
  }
  // const updateData = books.find((each) => each.id === id);
  const updateData = books.map((each) => {
    if (each.id === id) {
      return {
        ...each,
        ...data,
      };
    }
    return each;
  });
  return res.status(200).json({
    success: true,
    message: "Updated a Book By their ID",
    data: updateData,
  });
});

module.exports = router;
