const createError = require('../utils/createError');

// exports.register = async (req, res, next) => {
// 	try {
// 		console.log(e);
// 		res.status(201).json({ message: 'user created successfully' });
// 	} catch (error) {
// 		next(error);
// 	}
// };

exports.register = async (req, res, next) => {
	try {
		createError('cant not register', 408);
		res.status(201).json({ message: 'user created successfully' });
	} catch (error) {
		next(error);
	}
};

exports.updateUser = async (req, res, next) => {
	try {
		res.status(200).json({ message: 'user updated successfully' });
	} catch (error) {
		next(error);
	}
};

exports.login = async (req, res, next) => {
	try {
		res.json({ message: 'login successfully' });
	} catch (error) {
		next(error);
	}
};
