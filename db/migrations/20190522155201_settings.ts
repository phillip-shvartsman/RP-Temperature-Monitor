import * as Knex from 'knex';


export async function up(knex: Knex): Promise<any> {
    return await knex.schema.createTable('settings', async (t) => {
        t.increments('id').primary();
        t.string('tempUnit');
    });
}


export async function down(knex: Knex): Promise<any> {
    return await knex.schema.dropTable('settings');
}

