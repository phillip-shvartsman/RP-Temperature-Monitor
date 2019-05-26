import * as config from '../knexfile';
import Knex from 'knex';
import LogEntry from '../common/LogEntry';
import debug from 'debug';
import Settings from '../common/Settings';

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
    try {
        dbDebug('Adding log entries: ', logEntries);
        for (const logEntry of logEntries) {
            await knex('log').insert(logEntry);
        }
        return;
    } catch (err) {
        return Promise.reject(err);
    }
}

export async function registerSensors(sensorUids: string[]): Promise<void> {
    try {
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
    } catch (err) {
        return Promise.reject(err);
    }
}

export async function getSettings(): Promise<any> {
    try {
        dbDebug('Retrieving Settings');
        const settings =  await knex('settings').select();
        return new Settings(settings[0].tempUnit);
    } catch (err) {
        return Promise.reject(err);
    }
}

export async function setSettings(settings: Settings): Promise<any> {
    try {
        dbDebug('Updating Settings');
        await knex('settings').where({id: 1 }).update(settings);
        const newSettings: Settings[] = await knex('settings').select('*');
        dbDebug('Got the following response: ', newSettings[0]);
    } catch (err) {
        return Promise.reject(err);
    }
}

export async function getTodayLog(): Promise<LogEntry[]> {
    try {
        dbDebug('Getting today\'s temperature logs.');
        const logEntry = new LogEntry('debug', -1);
        const logEntries: LogEntry[] = await knex('log')
            .where({day: logEntry.day, month: logEntry.month, year: logEntry.year})
            .select('*');
        return logEntries;
    } catch (err) {
        return Promise.reject(err);
    }
}
