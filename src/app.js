const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("./mongoose");

const app = express();
app.use(bodyParser.json());

// CRUD
app.post("/books", mongoose.addBook);
app.get("/books", mongoose.getBooks);
app.patch("/books/:id", mongoose.updateBook);
app.delete("/books/:id", mongoose.deleteBook);

app.get("/search", mongoose.findBooks);

app.listen(3000);
