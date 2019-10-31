const Database = require("./database/database");
const GraphqlServer = require("./graphql/server");

const main = async () => {
    console.log("💸 pennyworth is starting!");

    const database = new Database();
    await database.init();

    const graphqlServer = new GraphqlServer();
    await graphqlServer.start();
};

(async () => await main())();
