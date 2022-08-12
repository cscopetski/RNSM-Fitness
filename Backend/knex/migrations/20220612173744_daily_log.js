/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  try {
    return await knex.schema.createTable("daily_log", function (table) {
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("user")
        .onDelete("CASCADE");
      table.date("date").notNullable();
      table.double("weight_results").notNullable();
      table.double("weight_goal").notNullable();
      table.integer("protein_results").notNullable();
      table.integer("protein_goal").notNullable();
      table.integer("fat_results").notNullable();
      table.integer("fat_goal").notNullable();
      table.integer("carb_results").notNullable();
      table.integer("carb_goal").notNullable();
      table.integer("calorie_results").notNullable();
      table.integer("calorie_goal").notNullable();

      table.timestamps(true, true);

      table.primary(["user_id", "date"]);
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
    return await knex.schema.dropTable("daily_log");
  } catch (e) {
    console.error(e);
  }
}
