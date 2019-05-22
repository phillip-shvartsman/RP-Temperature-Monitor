import * as config from '../knexfile';
import Knex from 'knex';
import LogEntry from '../common/LogEntry';
import debug from 'debug';

const dbDebug = debug('database');

const knex: Knex = Knex(config);

export async function checkTables(): Promise<void> {
    const hasLog = await knex.schema.hasTable('log');
    const hasSensors = await knex.schema.hasTable('sensors');
    const hasSettings = await knex.schema.hasTable('settings');
    if ( !hasLog || !hasSensors || !hasSettings ) {
        await knex.migrate.rollback();
        await knex.migrate.latest();
    }
    return;
}

export async function addLogEntries(logEntries: LogEntry[]): Promise<void> {
    dbDebug('Adding log entries: ', logEntries);
    for (const logEntry of logEntries) {
        await knex('log').insert(logEntry);
    }
    return;
}

export async function registerSensors(sensorUids: string[]): Promise<void> {
    dbDebug('Attempting to register the following uids', sensorUids);
    for (const sensorUid of sensorUids) {
        const result: object[] = await knex('sensors').where({sensorUid});
        if (result.length === 0) {
            dbDebug('Registering new sensor', sensorUid);
            await knex('sensors').insert({sensorUid, name: sensorUid});
        } else {
            dbDebug('Sensor ' + sensorUid + ' already exists in database');
        }
    }
    return;
}
