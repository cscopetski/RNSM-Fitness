/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 export async function up(knex) {
    try {
        return await knex.schema.createTable("profiles", function (table) {
            table
            .integer("user_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("user")
            .onDelete("CASCADE")
            .primary();

            table.string("description").notNullable();
            table.string("icon").notNullable();
            
            table.timestamps(true, true);
        });
      } catch (e) {
        console.error(e);
      }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 export async function down(knex) {
    try {
        return await knex.schema.dropTable("profiles");
      } catch (e) {
        console.error(e);
      }
};
