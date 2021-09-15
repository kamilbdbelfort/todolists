const { user, todoItem, todoList, tag, itemtag } = require("./models");

// const getAllUsers = async () => {
//   try {
//     const users = await user.findByPk(1);
//     console.log(users);
//   } catch (e) {
//     console.log(e.message);
//   }
// };

// // getAllUsers();

// const getTodoListWithUser = async () => {
//   try {
//     const lists = await todoList.findAll({ include: user });
//     return lists.map((list) => list.get({ plain: true }));
//   } catch (e) {
//     console.log(e.message);
//   }
// };

// getAllUsers().then((data) => console.log(data));

const getItemsWithTags = async () => {
  try {
    const items = await todoItem.findAll({ include: tag });
    return items.map((item) => item.get({ plain: true }));
  } catch (e) {
    console.log(e.message);
  }
};

getItemsWithTags().then((data) => console.log(data));
