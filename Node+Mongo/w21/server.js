const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Book = require('./models/Book');

const app = express();
const PORT = 5000;

//Middleware
app.use(bodyParser.json());
app.use(cors());

//Mongodb Connection
mongoose.connect('mongodb://localhost:27017/bookstore')
.then(() => {console.log("DB Connected")})
.catch(err => console.log("DB error: ",err));

//All Routes

//Add new book
app.post('/books',async (req, res) => {
    try{
        const {title, author, price, genre} = req.body;
        const newBook = new Book({title, author, price, genre});
        await newBook.save();
        res.status(201).json(newBook);
    }catch(err){
        res.status(400).json({error: err.message});
    }
});

//Get all books
app.get("/books", async(req, res) =>{
    const books = await Book.find();
    res.json(books);
})

//Update a book
app.put('/books/:id', async(req, res) => {
    try{
        const updatedBook = await Book.findByIdAndUpdate(req.params.id,req.body,{new: true});
        if(!updatedBook) return res.status(401).send("Book not found");
        res.json(updatedBook);
    }catch(err){
        res.status(400).json({error: err.message});
    }
});

//Delete a book
app.delete('/books/:id', async(req, res) =>{
    try{
        const deleted = await Book.findByIdAndDelete(req.params.id);
        if(!deleted) return res.status(401).send("Book not found");
        res.json({message: "Book deleted"});
    }catch(err){
        res.status(400).json({error: err.message});
    }
})


//Start Server
app.listen(PORT, () => {
    console.log(`PORT Running at ${PORT}`);
});
