/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  try {
    return await knex.schema.createTable("food", function (table) {
      table.increments("id").notNullable().primary();
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("user")
        .onDelete("CASCADE");
      table.string("name", 255).notNullable();
      table.boolean("is_visible").notNullable().defaultTo(true);
      table.integer("protein").notNullable();
      table.integer("fat").notNullable();
      table.integer("carbs").notNullable();
      table.integer("calories").notNullable();
      table.double("serving_size").notNullable();

      table.timestamps(true, true);
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
    return await knex.schema.dropTable("food");
  } catch (e) {
    console.error(e);
  }
}
