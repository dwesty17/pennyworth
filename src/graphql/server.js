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
            const { url } = await this.server.listen(port);
            console.log(`🌎 Server started at ${url}`);
        } catch (error) {
            console.error("☠️ Unable to start thee server");
            process.exit(1);
        }
    }
}

module.exports = GraphqlServer;