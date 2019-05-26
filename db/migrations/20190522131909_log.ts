import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
    return await knex.schema.createTable('log', async (t) => {
        t.increments('id').primary();
        t.string('sensorUid');
        t.integer('month');
        t.integer('year');
        t.integer('day');
        t.integer('temp');
        t.integer('hour');
        t.integer('minute');
        t.integer('timeStamp');
    });
}


export async function down(knex: Knex): Promise<any> {
    return await knex.schema.dropTable('log');
}

