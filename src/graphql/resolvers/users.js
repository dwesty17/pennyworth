const bcrypt = require("bcrypt");

const { User } = require("../../database/models");

const loginUser = async (_, { user }) => {
	try {
		const matchingUser = await User.findOne({ where: { email: user.email } });
		if (!matchingUser || matchingUser.isSuspended) {
			return;
		}

		const passwordMatch = await bcrypt.compare(user.password, matchingUser.password);

		if (passwordMatch) {
			const token = matchingUser.generateAuthToken();
			return { token, ...matchingUser.dataValues };
		}
	} catch (error) {
		console.error(error);
	}
};

const getUser = async (_, __, { user }) => {
	return user;
};

const createUser = async (_, { user }) => {
	try {
		const existingUser = await User.findOne({ where: { email: user.email }});
		if (existingUser) {
			return;
		}

		const passwordHash = await bcrypt.hash(user.password, 10);
		const newUser = await User.create({ ...user, password: passwordHash });

		// TODO generate and return a token when users can auto join

		return { ...newUser.dataValues };
	} catch (error) {
		console.error(error);
	}
};

module.exports = {
	loginUser,
	getUser,
	createUser,
};
