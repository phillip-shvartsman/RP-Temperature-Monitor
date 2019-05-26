import * as Knex from 'knex';

export async function seed(knex: Knex): Promise<any> {
    // Deletes ALL existing entries
    return knex('settings').del()
        .then(() => {
            // Inserts seed entries
            return knex('settings').insert([
                { id: 1, tempUnit: 'F' },
            ]);
        });
}
