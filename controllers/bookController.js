
const Book = require('../models/Book');

exports.getAllBooks = async (req, res) => {
    try {
        const { author, title, page = 1, limit = 10 } = req.query;

        const filter = {};
        if (author) filter.author = { $regex: author, $options: 'i' };
        if (title) filter.title = { $regex: title, $options: 'i' };

        const books = await Book.find(filter)
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createBook = async (req, res) => {
    const { title, author, year } = req.body;
    if (!title || !author || !year) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const book = new Book({ title, author, year });
        const savedBook = await book.save();
        res.status(201).json(savedBook);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateBook = async (req, res) => {
    const { id } = req.params;
    const { title, author, year } = req.body;

    try {
        const book = await Book.findById(id);
        if (!book) return res.status(404).json({ message: 'Book not found.' });

        if (title) book.title = title;
        if (author) book.author = author;
        if (year) book.year = year;

        const updatedBook = await book.save();
        res.json(updatedBook);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.deleteBook = async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findById(id);
        if (!book) return res.status(404).json({ message: 'Book not found.' });

        await book.remove();
        res.json({ message: 'Book deleted successfully.' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
