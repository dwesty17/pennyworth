const authenticated = (resolver) => (root, args, context, info) => {
    if (process.env.NODE_ENV === "production" && !context.currentUser) {
        throw new Error("Unauthenticated!");
    }

    return resolver(root, args, context, info);
};

module.exports = { authenticated };