const express = require('express');
const app = express();

app.use(express.static('public'));
app.use(express.json());

let books = [];

// GET route for the root route
app.get('/', (req, res) => {
  res.sendFile('index.html', {root: __dirname + '/public'});
});

// GET route for the /books route
app.get('/books', (req, res) => {
  res.json(books);
});

// POST route for the /books route
app.post('/books', (req, res) => {
  const {title, author, publishedDate} = req.body;
  if (!title || !author) {
    return res.status(400).json({error: 'Title and author are required'});
  }

  const id = books.length + 1;
  const book = {id, title, author, publishedDate};
  books.push(book);

  res.json(book);
});

// DELETE route for the /books/:id route
app.delete('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const bookIndex = books.findIndex(book => book.id === id);
  if (bookIndex === -1) {
    return res.status(404).json({error: 'Book not found'});
  }

  books.splice(bookIndex, 1);
  res.json({message: 'Book successfully deleted'});
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
