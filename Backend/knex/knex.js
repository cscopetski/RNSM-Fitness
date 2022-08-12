import knex from "knex";
import config from "./knexfile.js";

let client = config.development;

if (process.env.NODE_ENV === "production") {
    client = config.production;
}

const database = knex(client);

// const database = knex({
//   client: "mysql2",
//   connection: {
//     host: "64.227.1.70",
//     port: 3306,
//     user: "cscop",
//     password: "ScuffedRNSM1x!",
//     database: "testDB",
//   },
//   debug: true,
//   pool: { min: 2, max: 10 },
//   migrations: {
//     directory: "/knex/migrations",
//   },
//   seeds: {
//     directory: "/knex/seeds",
//   },
// });

export default database;
