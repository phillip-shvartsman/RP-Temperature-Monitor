import {Config} from 'knex';

module.exports = {
    client: 'sqlite3',
    connection : {
        filename: './db/templogs.sqlite',
    },
    migrations: {
        directory: './db/migrations',
        extension: 'ts',
    },
    seeds: {
        directory: './db/seeds',
        extension: 'ts',
    },
};
