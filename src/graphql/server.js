const { ApolloServer } = require("apollo-server");

const { PORT } = require("../config");
const typeDefs = require("./type-defs");
const resolvers = require("./resolvers");
const context = require("./context");

class GraphqlServer {
	constructor () {
		this.server = new ApolloServer({
			typeDefs,
			resolvers,
			context,
		});
	}

	async start () {
		try {
			await this.server.listen(PORT);
			console.log(`🌎 Server started on port ${PORT}`);
		} catch (error) {
			console.error("❌ Unable to start the server", error);
			process.exit(1);
		}
	}
}

module.exports = GraphqlServer;
