/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const tableName = "email_change";

export async function up(knex) {
  try {
    return await knex.schema.createTable(tableName, function (table) {
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("user")
        .onDelete("CASCADE");
      table.string("email_verification_token", 255).unique();
      table.string("new_email", 255).unique();
      table.timestamp("email_verification_token_expiration");

      table.timestamps(true, true);

      table.primary("user_id");
    });
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
    return await knex.schema.dropTable(tableName);
  } catch (e) {
    console.error(e);
  }
}
