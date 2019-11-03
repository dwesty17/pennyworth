const { ApolloServer } = require('apollo-server');

const typeDefs = require("./type-defs");
const resolvers = require("./resolvers");

class GraphqlServer {
    constructor () {
        this.server = new ApolloServer({ typeDefs, resolvers });
    }

    async start () {
        const port = process.env.PORT || 4000;
        try {
            await this.server.listen(port);
            console.log(`🌎 Server started on port ${port}`);
        } catch (error) {
            console.error("❌ Unable to start thee server", error);
            process.exit(1);
        }
    }
}

module.exports = GraphqlServer;