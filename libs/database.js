const knex = require('knex')({
    client: 'mysql',
    connection: {
        // host: '127.0.0.1',
        // port: 3306,
        // user: 'root',
        // password: '',
        // database: 'crudweb',
        host: 'sql12.freesqldatabase.com',
        port: 3306,
        user: 'sql12595594',
        password: 'JeyZb1X3Id',
        database: 'sql12595594'
    }
})

export default knex