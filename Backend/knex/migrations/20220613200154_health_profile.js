/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  try {
    return await knex.schema.createTable("health_profile", function (table) {
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("user")
        .onDelete("CASCADE")
        .primary();
      table.double("height").notNullable();
      table.double("weight").notNullable();
      table.double("initial_weight").notNullable();
      table.integer("activity_level").notNullable();
      table.integer("weight_goal").notNullable();
      table.double("goal_weight").notNullable();
      table.integer("bmr").notNullable();
      table.double("bmi").notNullable();
      //percentages of total calorie goal
      table.double("protein_goal_ratio").notNullable();
      table.double("fat_goal_ratio").notNullable();
      table.double("carb_goal_ratio").notNullable();
      table.integer("calorie_goal").notNullable();

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
    return await knex.schema.dropTable("health_profile");
  } catch (e) {
    console.error(e);
  }
}
