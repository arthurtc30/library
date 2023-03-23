const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	author: { type: String, required: true },
	publisher: { type: String, required: true },
	pages: { type: Number, required: true },
	tags: [
		{
			type: String,
		},
	],
});

module.exports = mongoose.model("Book", bookSchema);