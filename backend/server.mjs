import express from "express";
import cors from "cors";

const app = express();
// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON requests

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

// Post Request
app.post("/api/users", (req, res) => {
  try {
    const body = req.body;

    const newUser = {
      id: users.length + 1,
      ...body,
    };

    users.push(newUser);
    res.status(201).json({ message: "New user created!", data: newUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
});

// Put Request
app.put("/api/users/:id", (req, res) => {
  try {
    const userId = parseInt(req.params.id, 10);
    const updatedUser = req.body;
    const index = users.findIndex((user) => user.id === userId);

    if (index !== -1) {
      const userToUpdate = users[index];
      const updatedUserObject = { ...userToUpdate, ...updatedUser };
      users.splice(index, 1, updatedUserObject);
      res.status(200).json({
        message: `PUT request - Updating user ${userId}`,
        data: users[index],
      });
    } else {
      res.status(404).json({ message: `User with ID ${userId} not found` });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
});

// Delete Request
app.delete("/api/users/:id", (req, res) => {
  try {
    const userId = parseInt(req.params.id, 10);
    const index = users.findIndex((user) => user.id === userId);
    if (index !== -1) {
      const deletedUser = users.splice(index, 1);
      res.status(200).json({
        message: `DELETE request - Deleting user ${userId}`,
        deletedUser,
      });
    } else {
      res.status(404).json({ message: `User with ID ${userId} not found` });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
