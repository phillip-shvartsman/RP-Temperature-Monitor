import debug from 'debug';
import express from 'express';

import * as bodyParser from 'body-parser';

import * as dotenv from 'dotenv';
import * as path from 'path';

import * as DB from '../db/db';

import TempSensors from './TempSensors';

const httpDebug = debug('http');
const sensorDebug = debug('sensors');

async function startTempLogging() {
    try {
        await tempSensors.setSensors();
        const sensorUids = await tempSensors.getUids();
        await DB.registerSensors(sensorUids);
        setInterval(async () => {
            const logEntries = await tempSensors.getTemperatures();
            await DB.addLogEntries(logEntries);
        }, 60000);
    } catch (err) {
        sensorDebug(err);
    }
}

dotenv.config();

import index from './routes/index';
import logs from './routes/log';
import sensors from './routes/sensors';
import settings from './routes/settings';

const app = express();

const tempSensors = new TempSensors(process.env.SENSORMODE || 'test');

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../public')));

app.use('/', index);
app.use('/settings', settings);
app.use('/logs', logs);
app.use('/sensors', sensors);

const status = 'status';

// catch 404 and forward to error handler
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    const err: any = new Error('Not Found');
    err[status] = 404;
    next(err);
});

// error handler

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(err[status] || 500);
    res.send(err);
});

app.set('port', process.env.PORT );

startTempLogging();

const server = app.listen(app.get('port'), () => {
    httpDebug('Express server listening on port ' + process.env.PORT);
});
