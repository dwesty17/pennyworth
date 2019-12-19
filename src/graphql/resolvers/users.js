const bcrypt = require("bcrypt");

const { User } = require("../../database/models");

const getUser = async (_, __, { user }) => {
	return user;
};

const loginUser = async (_, { user }) => {
	try {
		// TODO should I just have a separate input type for login attempts?
		if (!user.email || !user.password) {
			return;
		}

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

const updateUser = async (_, { updatedUser }, { user }) => {
	try {
		delete updatedUser.email;
		delete updatedUser.password;
		if (updatedUser.monthlySpendingGoal && updatedUser.monthlySpendingGoal <= 0) {
			return;
		}
		await User.update(updatedUser, { where: { id: user.id } });
		return User.findOne({ where: { id: user.id } });
	} catch (error) {
		console.error(error);
	}
};

module.exports = {
	getUser,
	loginUser,
	createUser,
	updateUser,
};
