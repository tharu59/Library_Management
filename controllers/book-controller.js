const { UserModal, BookModal } = require("../modals");
const issuedBook = require("../dto/book-dto.js");

// const getAllBooks = () => {};
exports.getAllBooks = async (req, res) => {
  const books = await BookModal.find();

  if (books.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No books found",
    });
  }
  res.status(200).json({
    success: true,
    data: books,
  });
};

exports.getSingleBookById = async (req, res) => {
  const { id } = req.params;
  const book = await BookModal.findById(id);

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
};

exports.getAllIssuedBooks = async (req, res) => {
  const users = await UserModal.find({
    issuedBook: { $exists: true },
  }).populate("issuedBook");

  // DTO ==>Data Transfer Object
  const issuedBooks = users.map((each) => new issuedBook(each));
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
};

exports.addNewBook = async (req, res) => {
  const { data } = req.body;

  if (!data) {
    return res.status(400).json({
      success: false,
      message: "No Data to add a book",
    });
  }

  // const book = await books.find((each) => each.id === data.id);
  await BookModal.create(data);
  const allBooks = await BookModal.find();

  return res.status(201).json({
    success: true,
    message: "Book Added Successfully",
    data: allBooks,
  });
};

exports.updateBookById = async (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  const updatedBook = await BookModal.findOneAndUpdate(
    {
      _id: id,
    },
    data,
    {
      new: true,
    }
  );
  return res.status(200).json({
    success: true,
    message: "Updated a Book By their ID",
    data: updatedBook,
  });
};

// modules.exports = { getAllBooks, getSingleBookById };
