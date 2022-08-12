/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  try {
    return await knex.schema.createTable("daily_food_log", function (table) {
      table.increments("id").primary();
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("user")
        .onDelete("CASCADE");
      table.date("date").notNullable();

      table.timestamps(true, true);

      table.unique(["user_id", "date"]);
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
    return await knex.schema.dropTable("daily_food_log");
  } catch (e) {
    console.error(e);
  }
}
