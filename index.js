const express = require("express");
const { v4: uuid } = require("uuid");

/*
interface BookData {
    id: "string",
    title: "string",
    description: "string",
    authors: "string",
    favorite: "string",
    fileCover: "string",
    fileName: "string"
}
*/

class Book {
  constructor(bookData) {
    this.id = bookData.id;
    this.title = bookData.title;
    this.description = bookData.description;
    this.authors = bookData.authors;
    this.favorite = bookData.favorite;
    this.fileCover = bookData.fileCover;
    this.fileName = bookData.fileName;
  }
}

const store = {
  library: [],
};

const getDefaultBooks = (bookCount = 3) => {
  let counter = 0;
  while (counter <= bookCount) {
    const book = {
      id: uuid(),
      title: `Book ${counter}`,
      description: `Description ${counter}`,
      authors: `Author ${counter}`,
      favorite: `${counter}`,
      fileCover: `cover_${counter}.png`,
      fileName: `book_${counter}.pdf`,
    };
    store.library.push(new Book(book));
    counter++;
  }
};

getDefaultBooks();

const app = express();
app.use(express.json());

app.get("/api/books", (req, res) => {
  const { library } = store;
  res.json(library);
});

app.get("/api/books/:id", (req, res) => {
  const { library } = store;
  const { id } = req.params;
  const index = library.findIndex((el) => el.id === id);

  if (index !== -1) {
    res.json(library[index]);
  } else {
    res.status(404);
    res.json("404 | book not found");
  }
});

app.post("/api/user/login", (req, res) => {
  const defaultUser = { id: 1, mail: "test@mail.ru" };

  res.status(201);
  res.json(defaultUser);
});

app.post("/api/books/", (req, res) => {
  const { library } = store;

  const newBookData = {
    id: uuid(),
    title: req.body.title,
    description: req.body.description,
    authors: req.body.authors,
    favorite: req.body.favorite,
    fileCover: req.body.fileCover,
    fileName: req.body.fileName,
  };

  const newBook = new Book(newBookData);
  library.push(newBook);

  res.status(201);
  res.json(newBook);
});

app.put("/api/books/:id", (req, res) => {
  const { library } = store;
  const { id } = req.params;
  const index = library.findIndex((el) => el.id === id);

  if (index !== -1) {
    library[index] = {
      ...todo[index],
      title: req.body.title,
      description: req.body.description,
      authors: req.body.authors,
      favorite: req.body.favorite,
      fileCover: req.body.fileCover,
      fileName: req.body.fileName,
    };

    res.json(library[index]);
  } else {
    res.status(404);
    res.json("404 | book not found");
  }
});

app.delete("/api/books/:id", (req, res) => {
  const { library } = store;
  const { id } = req.params;
  const index = library.findIndex((el) => el.id === id);

  if (index !== -1) {
    library.splice(index, 1);
    res.json("ok");
  } else {
    res.status(404);
    res.json("404 | book not found");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`server is started on port ${PORT}`));
