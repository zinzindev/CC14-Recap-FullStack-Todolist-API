const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const createError = require('../utils/createError');
const { User } = require('../models');

exports.register = async (req, res, next) => {
	try {
		const { username, email, password, confirmPassword, birthDate } = req.body;

		if (password !== confirmPassword) {
			createError('passwords do not match', 400);
		}
		if (!password) {
			createError('password is required', 400);
		}
		if (password.length < 6) {
			createError('password must be at least 6 characters', 400);
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const user = await User.create({
			// username: username,
			// email: email,
			// password: hashedPassword,
			// birthDate: birthDate,
			username,
			email,
			password: hashedPassword,
			birthDate,
		});

		// createError("cant not register", 409);
		// res.status(201).json({ message: 'user created successfully', user: user });
		res.status(201).json({ message: 'user created successfully' });
	} catch (error) {
		next(error);
	}
};

exports.updateUser = async (req, res, next) => {
	try {
		const { oldPassword, newPassword, confirmNewPassword, birthDate } = req.body;
		const user = req.user;

		// #4 VALIDATE PASSWORD
		const isMatch = await bcrypt.compare(oldPassword, user.password);
		if (!isMatch) {
			createError('invalid password', 400);
		}

		if (newPassword !== confirmNewPassword) {
			createError('new passwords do not match', 400);
		}
		if (!newPassword) {
			createError('new password is required', 400);
		}
		if (newPassword.length < 6) {
			createError('new password must be at least 6 characters', 400);
		}

		// HASED PASSWORD
		const hashedPassword = await bcrypt.hash(newPassword, 10);

		// UPDATE USER
		const result = await User.update(
			{ password: hashedPassword, birthDate, lastUpdatedPassword: new Date() },
			{ where: { id: user.id } }
		);

		// res.status(200).json({ message: 'user updated successfully', decoded, user, result });
		res.status(200).json({ message: 'user updated successfully', result });
	} catch (error) {
		next(error);
	}
};

exports.login = async (req, res, next) => {
	try {
		const { username, password } = req.body;

		// #1
		if (!username) {
			createError('username is required', 400);
		}
		if (!password) {
			createError('password is required', 400);
		}
		if (password.length < 6) {
			createError('password must be at least 6 characters', 400);
		}

		// #2 FIND USER
		const user = await User.findOne({ where: { username } });

		if (!user) {
			createError('username or password is not correct', 400);
		}

		// #3 CHECK PASSWORD
		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) {
			createError('username or password is not correct', 400);
		}

		// #4 CREATE TOKEN
		const payload = { id: user.id, username: user.username };
		const SECRET_KEY = process.env.SECRET_KEY || 'YOUR SECRET MESSAGE';
		const option = { expiresIn: '1h' };
		const token = jwt.sign(payload, SECRET_KEY, option);

		console.log(JSON.stringify(user, null, 2));
		// res.json({ message: 'login successfully' });
		res.json({ message: 'login successfully', token });
	} catch (error) {
		next(error);
	}
};
