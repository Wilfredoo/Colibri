const spicedPg = require('spiced-pg');
let secrets;
let dbUrl;
if (process.env.NODE_ENV === 'production') {
    secrets = process.env
    dbUrl = secrets.DATABASE_URL
} else {
    secrets = require('./secrets.json')
    dbUrl = `postgres:${secrets.dbUser}:${secrets.dbPassword}@localhost:5432/colibri`;
}
const db = spicedPg(dbUrl);


exports.test = () => {
  console.log("hey im in database");
};
