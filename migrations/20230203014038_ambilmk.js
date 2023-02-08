/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('ambilmk', table => {
        table.string('kodeambilmk', 10)
        table.string('nim', 80)
        table.string('kodemk', 10)
        table.integer('nilai', 3)
        table.primary('kodeambilmk')
        table.foreign('nim').references('mahasiswa.nim')
        table.foreign('kodemk').references('matakuliah.kodemk')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('ambilmk')
};