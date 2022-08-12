import { insertUser } from "../../src/models/userDAO.js";
import { signupUser } from "../../src/services/user/signup.service.js";

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  try {
    return await knex.schema.createTable("user", function (table) {
      table.increments("id").notNullable().primary();
      table.string("firstname", 255).notNullable().defaultTo("FirstName");
      table.string("lastname", 255).notNullable().defaultTo("LastName");
      table.string("email", 255).notNullable().unique();
      table.string("password", 255).notNullable();
      table.string("units", 255).notNullable();
      table.date("dob").notNullable();
      table.integer("age").notNullable();
      table.enu("gender", ["male", "female"]).notNullable();

      table.timestamps(true, true);
    });
    // .then(() => {
    //   const nullUser = {
    //     id: 1,
    //     firstname: "Null",
    //     lastname: "User",
    //     email: "",
    //     password: "",
    //     units: "imperial",
    //     dob: "2022-07-07",
    //     age: 0,
    //     gender: "male",
    //   };
    //   insertUser(nullUser);
    // });
  } catch (e) {
    console.error(e);
  }
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  try {
    return await knex.schema.dropTable("user");
  } catch (e) {
    console.error(e);
  }
}
