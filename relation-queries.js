const { user, todoItem, todoList } = require("./models");

async function listsWithUsers() {
  const lists = await todoList.findAll({
    include: [{ model: user, attributes: ["name"] }],
  });
  return lists.map((list) => list.toJSON());
}

listsWithUsers().then((lists) => console.log(lists));

async function getUsers() {
  const allUsers = await user.findAll({
    include: { model: todoList, attributes: ["title"] },
  });
  return allUsers.map((user) => user.toJSON());
}

getUsers().then((users) => console.log(users));

// exercise get one user by 'id' with his lists
async function userWithLists(id) {
  const userWithList = await user.findByPk(id, {
    include: [todoList],
  });
  return userWithList.get({ plain: true });
}

userWithLists(1).then((users) => console.log(users));

// get important TodoItems with the 'title' of the list they belong to
async function importantTodoItemsTitle() {
  const todoItems = await todoItem.findAll({
    where: { important: true },
    include: { model: todoList, attributes: ["title"] },
  });
  console.log(todoItems);
  return todoItems;
}

importantTodoItemsTitle().then((items) =>
  items.map((item) => console.log(item.get({ plain: true })))
);

// get one user by 'id' with his lists, which also contain their belonging TodoItem's 'task' attribute
async function getUserListsAndAttributes(id) {
  const result = await user.findByPk(id, {
    include: [
      { model: todoList, include: { model: todoItem, attributes: ["task"] } },
    ],
  });
  //console.log(result);
  const toReturn = result.get({ plain: true });
  return toReturn[0];
}

getUserListsAndAttributes(1).then((users) => console.log(users));
