/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('matakuliah', table => {
        table.string('kodemk', 10)
        table.string('nama', 80)
        table.integer('sks', 1)
        table.string('nidn', 10)
        table.primary('kodemk')
        table.foreign('nidn').references('dosen.nidn')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('matakuliah')
};