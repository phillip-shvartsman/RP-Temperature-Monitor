import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
    return await knex.schema.createTable('sensors', async (t) => {
        t.increments('id').primary();
        t.string('sensorUid').unique();
        t.string('name').unique();
    });
}

export async function down(knex: Knex): Promise<any> {
    return await knex.schema.dropTable('sensors');
}
