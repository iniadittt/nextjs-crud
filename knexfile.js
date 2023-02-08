// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

    // development: {
    //     client: 'mysql',
    //     connection: {
    //         host: '127.0.0.1',
    //         port: 3306,
    //         user: 'root',
    //         password: '',
    //         database: 'crudweb'
    //     }
    // },

    development: {
        client: 'mysql',
        connection: {
            host: 'sql12.freesqldatabase.com',
            port: 3306,
            user: 'sql12595594',
            password: 'JeyZb1X3Id',
            database: 'sql12595594'
        }
    },

    production: {
        client: 'mysql',
        connection: {
            host: 'sql12.freesqldatabase.com',
            port: 3306,
            user: 'sql12595594',
            password: 'JeyZb1X3Id',
            database: 'sql12595594'
        }
    },

}