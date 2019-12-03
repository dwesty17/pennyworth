const { NODE_ENV } = require("../config");

const authenticated = (resolver) => (root, args, context, info) => {
    const user = context.user || {};

    if (NODE_ENV === "production" && !user.id) {
        throw new Error("Unauthenticated!");
    }

    if (user.isSuspended) {
        throw new Error("Suspended account!");
    }

    return resolver(root, args, context, info);
};

module.exports = { authenticated };
