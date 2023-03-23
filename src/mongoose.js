const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const Book = require("./models/book");

mongoose
	.connect(process.env.MONGODB_URL)
	.then(() => {
		console.log("Successfully connected to database");
	})
	.catch(() => {
		console.log("Connection to database failed");
	});

const addBook = async (req, res) => {
	const bookToAdd = new Book({
		title: req.body.title,
		description: req.body.description,
		author: req.body.author,
		publisher: req.body.publisher,
		pages: req.body.pages,
		tags: req.body.tags,
	});

	try {
		const result = await bookToAdd.save();
		res.json({
			message: `Successfully added book "${bookToAdd.title}"`,
			addedBook: result,
		});
	} catch (err) {
		res.json({ message: "Could not add book", error: err.message });
	}
};

const getBooks = async (req, res) => {
	const books = await Book.find().exec();
	res.json({
		message: `Found ${books.length} books`,
		results: books,
	});
};

const updateBook = async (req, res) => {
	const bookId = req.params.id;

	try {
		const book = await Book.findByIdAndUpdate(bookId, {
			title: req.body.title,
			description: req.body.description,
			author: req.body.author,
			publisher: req.body.publisher,
			pages: req.body.pages,
			tags: req.body.tags,
		});

		res.json({ message: `Successfully updated book "${book.title}"` });
	} catch (err) {
		res.json({ message: "Could not update book", error: err.message });
	}
};

const deleteBook = async (req, res) => {
	const bookId = req.params.id;

	try {
		const book = await Book.findByIdAndDelete(bookId);
		res.json({ message: `Successfully removed book "${book.title}"` });
	} catch (err) {
		res.json({ message: "Could not delete book", error: err.message });
	}
};

const findBooks = async (req, res) => {
	const { title, author, publisher } = req.query;

	try {
		const books = await Book.find({
			...(title && { title: { $regex: title, $options: "i" } }),
			...(author && { author: { $regex: author, $options: "i" } }),
			...(publisher && {
				publisher: { $regex: publisher, $options: "i" },
			}),
		}).exec();
		res.json({ message: `Found ${books.length} books`, results: books });
	} catch (err) {
		res.json({ message: "Could find books", error: err.message });
	}
};

exports.addBook = addBook;
exports.getBooks = getBooks;
exports.updateBook = updateBook;
exports.deleteBook = deleteBook;

exports.findBooks = findBooks;
