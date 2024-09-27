import express from "express";

const app = express();

const PORT = 3000;

const users = [
  {
    id: 1,
    name: "Faizan Ahmad",
    email: "faizan@gmail.com",
    age: 20,
  },
  {
    id: 2,
    name: "Ahmad Khan",
    email: "ahmad@gmail.com",
    age: 22,
  },
  {
    id: 3,
    name: "Ali",
    email: "ali@gmail.com",
    age: 24,
  },
];

// Get Request
app.get("/api/users", (req, res) => {
  try {
    res
      .status(200)
      .json({ message: "Fetching all users from the array", data: users });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
