const { sequelize } = require('./models');
const { User, Todo } = require('./models');

// sequelize
// //   .sync({ force: true })
//   .sync({ alter: true })
//   .then(() => console.log("DB synced!"))
//   .catch((err) => console.log(err));

// const run = async () => {
// 	try {
// 		const user = await User.create({
// 			username: 'zin',
// 			password: 'datascience',
// 			email: 'zinzin30@gmail.com',
// 		});
// 		console.log(JSON.stringify(user, null, 2));
// 	} catch (err) {
// 		console.log(err);
// 	}
// };

// const run = async () => {
// 	try {
// 		const todo = await Todo.bulkCreate([
// 			{ title: 'math', completed: false, dueDate: new Date(), userId: 1 },
// 			{ title: 'english', completed: true, dueDate: new Date(), userId: 2 },
// 			{ title: 'science', completed: false, userId: 1 },
// 			{ title: 'history', userId: 2 },
// 		]);
// 		console.log(JSON.stringify(todo, null, 2));
// 	} catch (err) {
// 		console.log(err);
// 	}
// };

// run();
