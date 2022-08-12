/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  try {
    return await knex.schema.createTable("daily_food", function (table) {
      table.increments("id").notNullable().primary();
      table
        .integer("daily_food_log_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("daily_food_log")
        .onDelete("CASCADE");
      table
        .integer("food_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("food")
        .onDelete("CASCADE");
      table.double("quantity").notNullable();
      table
        .enum("meal", ["breakfast", "lunch", "dinner", "snacks"])
        .notNullable();

      table.timestamps(true, true);

      table.unique(["daily_food_log_id", "food_id", "id"]);
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
    return await knex.schema.dropTable("daily_food");
  } catch (e) {
    console.error(e);
  }
}
