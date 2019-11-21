const { NODE_ENV } = require("../config");

const authenticated = (resolver) => (root, args, context, info) => {
    if (NODE_ENV === "production" && !context.currentUser) {
        throw new Error("Unauthenticated!");
    }

    return resolver(root, args, context, info);
};

module.exports = { authenticated };