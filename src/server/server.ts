import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("dist"));

const PORT = process.env.PORT || 5800;

const books = [
  {
    ISBN: "9.78E+12",
    title: "In Too Deep",
    coverImage:
      "https://m.media-amazon.com/images/I/41s4IPscgtL._SX342_SY445_QL70_ML2_.jpg",
    author: "Lee Child",
    rating: null,
  },
  {
    ISBN: "9.78E+12",
    title: "Tripwire",
    coverImage:
      "https://m.media-amazon.com/images/I/51NaeFSwWCL._SY445_SX342_.jpg  ",
    author: "Lee Child",
    rating: null,
  },
  {
    ISBN: "9.78E+12",
    title: "Gregg's Italian Family Cookbook",
    coverImage:
      "https://m.media-amazon.com/images/I/51pUC8j3LpL._SX342_SY445_.jpg",
    author: "Gregg Wallace",
    rating: 4.5,
  },
  {
    ISBN: "9.78E+12",
    title: "My Kind of Food: Recipes I Love to Cook at Home",
    coverImage:
      "https://m.media-amazon.com/images/I/511UNmG50GL._SY445_SX342_QL70_ML2_.jpg",
    author: "John Torode",
    rating: null,
  },
];

// Simple GET API endpoint
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Checkatrade!" });
});

app.get("/api/books", (req, res) => {
  const title = req.query.title as string; // Cast 'title' as a string
  if (title) {
    const filteredBooks = books.filter((book) =>
      book.title.toLowerCase().includes(title.toLowerCase())
    );
    if (filteredBooks.length > 0) {
      res.json(filteredBooks);
    } else {
      res.json([]);
    }
  } else {
    res.json(books);
  }
});

// app.get("/api/books", (req, res) => {
//   res.json(books);
// });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${books}`);
});
