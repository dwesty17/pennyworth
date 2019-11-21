const DATABASE_URL = process.env.DATABASE_URL || "postgres://localhost/postgres";
const JWT_KEY = process.env.JWT_KEY || "secret";
const NODE_ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 4000;

module.exports = {
    DATABASE_URL,
    JWT_KEY,
    NODE_ENV,
    PORT,
};