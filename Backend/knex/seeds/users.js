import { signupUser } from "../../src/models/userDAO.js";

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("user").del();

  const users = [
    { username: "joe123", email: "joe@gmail.com", password: "12345" },
    { username: "bob123", email: "bob@gmail.com", password: "12345" },
    { username: "tom123", email: "tom@gmail.com", password: "12345" },
  ];

  users.forEach((user) => {
    signupUser(user);
  });
}
