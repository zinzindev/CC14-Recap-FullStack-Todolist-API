const { sequelize } = require('./models');
const { User } = require('./models');

// sequelize
// 	.authenticate()
// 	.then(() => {
// 		console.log('Connection has been established successfully.');
// 	})
// 	.catch((err) => {
// 		console.log('Unable to connect to the database:', err);
// 	});

// sequelize
// 	// .sync({ force: true })
// 	.sync({ alter: true })
// 	.then(() => console.log('DB synced!'))
// 	.catch((err) => console.log(err));

// const run = async () => {
// 	try {
// 		const user = await User.create({
// 			username: 'john',
// 			password: '123456',
// 			email: 'john@g.com',
// 		});
// 		console.log(JSON.stringify(user, null, 2));
// 	} catch (err) {
// 		console.log(err);
// 	}
// };

// run();
