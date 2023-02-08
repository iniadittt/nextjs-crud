/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('dosen', table => {
        table.string('nidn', 10)
        table.string('nama', 80)
        table.enum('jenisKelamin', ['L', 'P'])
        table.string('tempatLahir', 20)
        table.date('tanggalLahir')
        table.string('alamat', 128)
        table.string('email', 32)
        table.string('noHp', 16)
        table.primary('nidn')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('dosen')
};