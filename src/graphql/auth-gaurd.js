const authenticated = (resolver) => (root, args, context, info) => {
    const user = context.user || {};

    if (!user.id) {
        throw new Error("Unauthenticated!");
    }

    if (user.isSuspended) {
        throw new Error("Suspended account!");
    }

    return resolver(root, args, context, info);
};

module.exports = {authenticated};
