const Database = require("./database/connection");
const GraphqlServer = require("./graphql/server");

const main = async () => {
    console.log("💸 pennyworth is starting!");
    const startTime = new Date();

    const database = new Database();
    await database.init();

    const graphqlServer = new GraphqlServer();
    await graphqlServer.start();

    const startUpSeconds = (new Date() - startTime) / 1000;
    console.log(`💸 pennyworth started in ${startUpSeconds} seconds!`);
};

(async () => await main())();
