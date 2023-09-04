const jwt = require('jsonwebtoken');
const { User } = require('../models/');
const createError = require('../utils/createError');

exports.getUserByToken = async (req, res, next) => {
	try {
		// #1 EXTRACT HEADERS TO TOKEN
		const { authorization } = req.headers;
		if (!authorization || !authorization.startsWith('Bearer')) {
			createError('you are unauthorized', 401);
		}
		// const [Bearer, token] = authorization.split(' ');
		const [, token] = authorization.split(' ');
		if (!token) {
			createError('you are unauthorized', 401);
		}

		// #2 DECODE TOKEN
		const SECRET_KEY = process.env.SECRET_KEY || 'YOUR SECRET MESSAGE';
		const decoded = jwt.verify(token, SECRET_KEY);

		// #3 FIND USER
		const user = await User.findOne({ where: { id: decoded.id } });
		if (!user) {
			createError('you are unauthorized', 401);
		}

		// #3.5 OLD TOKEN
		if (decoded.iat * 1000 < new Date(user.lastUpdatedPassword).getTime()) {
			createError('token is outdate', 401);
		}

		// #4 SET USER TO REQ
		req.user = user;

		// SEND TO NEXT MIDDLEWARE
		next();
	} catch (err) {
		next(err);
	}
};
