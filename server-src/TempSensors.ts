import debug from 'debug';
import * as W1TEMP from 'w1temp';

import LogEntry from '../common/LogEntry';

const sensorDebug = debug('sensors');

export default class TempSensors {
    // Set debug to true to use a fake temp generation. False will use the actual temp sensor.
    private sensorMode: string;
    private sensors: W1TEMP.Sensor[];
    private sensorUids: string[];
    private debugTemp: number[];

    public constructor(sensorMode: string) {
        this.sensorMode = sensorMode;
        this.sensors = [];
        this.sensorUids = [];
        this.debugTemp = [20, 20, 20];
    }
    public async setSensors(): Promise<void> {

        if (this.sensorMode === 'pi') {

            sensorDebug('Starting in pi mode', W1TEMP);

            this.sensorUids = await W1TEMP.getSensorsUids();

            sensorDebug('Got the following sensorUids', this.sensorUids);

            for (let i = 0; i < this.sensorUids.length; i = i + 1) {
                this.sensors[i] = await W1TEMP.getSensor(this.sensorUids[i]);
            }
            sensorDebug('Loaded ' + this.sensors.length + ' sensors.');

        } else {
            this.sensorUids = ['debug0', 'debug1', 'debug2'];
            sensorDebug('Starting in test mode');
        }

    }
    public async getTemperatures(): Promise<LogEntry[]> {

        if (this.sensorMode === 'pi') {

            const logEntries: LogEntry[] = [];

            for ( let i = 0 ; i < this.sensorUids.length; i = i + 1) {

                const temperature = await this.sensors[i].getTemperatureAsync();
                logEntries[i] = await new LogEntry(this.sensorUids[i], temperature);

            }
            sensorDebug('Got the following log entries: ', logEntries);
            return logEntries;

        } else {
            const logEntries: LogEntry[] = [];
            for (let i = 0 ; i < this.sensorUids.length ; i = i + 1) {
                const r = Math.random();
                if (r > 0.5) {
                    this.debugTemp[i] = this.debugTemp[i] + 1;
                } else {
                    this.debugTemp[i] = this.debugTemp[i] - 1;
                }
                logEntries.push(new LogEntry(this.sensorUids[i], this.debugTemp[i]));
            }
            sensorDebug('Created the following fake entries: ', logEntries);

            return logEntries;

        }
    }
    public async getUids(): Promise<string[]> {
        sensorDebug('Returning the following uids', this.sensorUids);
        return this.sensorUids;
    }
}
