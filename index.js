const express = require("express");
const User = require("./models").user;
const TodoList = require("./models").todoList;
const app = express();
const PORT = 4000;

app.use(express.json());

app.post("/echo", (req, res) => {
  res.json(req.body);
});

// Create a new user account
app.post("/users", async (req, res, next) => {
  try {
    const email = req.body.email;
    if (!email) {
      res.status(400).send("Must provide an email address");
    } else {
      const user = await User.create(req.body);
      res.json(user);
    }
  } catch (e) {
    next(e);
  }
});

// create a list for a user
app.post("/lists/:listId", async (req, res, next) => {
  try {
    const userId = req.body.userId;
    //console.log(req.body);
    if (!userId) {
      res.status(400).send("Must provide a user id");
    } else {
      const todoList = await TodoList.create(req.body);
      res.json(todoList);
    }
  } catch (e) {
    next(e);
  }
});

// create a list for a user no.2
app.post("/users/:userId/lists", async (req, res, next) => {
  try {
    const userId = req.body.userId;
    //console.log(req.body);
    if (!userId) {
      res.status(404).send("User not found!");
    } else {
      const todoList = await TodoList.create(req.body);
      res.json(todoList);
    }
  } catch (e) {
    next(e);
  }
});

// Create a new todo List
app.post("/lists", async (req, res, next) => {
  try {
    const userId = req.body.userId;
    console.log(req.body);
    np;
    if (!userId) {
      res.status(400).send("Must provide a user id");
    } else {
      const todoList = await TodoList.create(req.body);
      res.json(todoList);
    }
  } catch (e) {
    next(e);
  }
});

// get a list for a user
app.get("/users/:userId/lists/:listId", async (req, res, next) => {
  try {
    // userId check
    const userId = parseInt(req.params.userId);
    const user = await User.findByPk(userId, {
      include: [TodoList],
    });
    if (user) {
      res.send(user.todoLists);
    } else {
      res.status(404).send("User not found");
    }
    // listId check
    const listId = parseInt(req.body.listId);
    const list = await TodoList.findByPk(listId);
    if (list) {
      res.send(list);
    } else {
      res.status(404).send("List id not found");
    }
  } catch (e) {
    next(e);
  }
});

// get all users
app.get("/users", async (req, res) => {
  const users = await User.findAll();
  res.send(users);
});

// get all lists
app.get("/lists", async (req, res, next) => {
  try {
    const lists = await TodoList.findAll();
    res.send(lists);
  } catch (e) {
    next(e);
  }
});

// get a user
app.get("/users/:userId", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    if (!user) {
      res.status(404).json("User id not found.");
    }
    res.send(user);
  } catch (e) {
    next(e);
  }
});

// get lists of a user
app.get("/users/:userId/lists", async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId);
    const user = await User.findByPk(userId, {
      include: [TodoList],
    });
    if (user) {
      res.send(user.todoLists);
    } else {
      res.status(404).send("User not found");
    }
  } catch (e) {
    next(e);
  }
});

// update a user
app.put("/users/:userId", async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId);
    const userToUpdate = await User.findByPk(userId);
    if (!userToUpdate) {
      res.status(404).send("User not found");
    } else {
      const updatedUser = await userToUpdate.update(req.body);
      res.json(updatedUser);
    }
  } catch (e) {
    next(e);
  }
});

// Update a todoList
app.put("/lists/:listId", async (req, res, next) => {
  try {
    const listId = parseInt(req.params.listId);
    const listToUpdate = await TodoList.findByPk(listId);
    if (!listToUpdate) {
      res.status(404).send("List not found");
    } else {
      const updatedList = await listToUpdate.update(req.body);
      res.json(updatedList);
    }
  } catch (e) {
    next(e);
  }
});

// Delete a list
app.delete("/lists/:listId", async (req, res, next) => {
  try {
    const listId = parseInt(req.params.listId);
    const listIdToDelete = await TodoList.findByPk(listId);
    if (listIdToDelete) {
      const deleted = await listIdToDelete.destroy();
      res.send(deleted);
    } else {
      res.status(404).send("List not found");
    }
  } catch (e) {
    next(e);
  }
});

// Delete all user's lists
app.delete("/users/:userId/lists", async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId);
    const user = await User.findByPk(userId, {
      include: [TodoList],
    });
    if (user) {
      user.todoLists.forEach(async (list) => await list.destroy());
      res.status(204).send("lists are destroyed");
    } else {
      res.status(404).send("User lists not found");
    }
  } catch (e) {
    next(e);
  }
});

app.listen(PORT, () => console.log(`Server started in port: ${PORT}`));
