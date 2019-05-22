import debug from 'debug';
import express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as DB from '../db/db';
import TempSensor from './TempSensors';
import * as dotenv from 'dotenv';

const httpDebug = debug('http');


async function startTempLogging() {
    await tempSensor.setSensors();
    const sensorUids = await tempSensor.getUids();
    await DB.registerSensors(sensorUids);
    setInterval(async () => {
        const logEntries = await tempSensor.getTemperatures();
        await DB.addLogEntries(logEntries);
    }, 10000);
}

dotenv.config();

import routes from './routes/index';


const app = express();

const tempSensor = new TempSensor(process.env.SENSORMODE || 'test');

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../public')));

app.use('/', routes);

const status = 'status';

// catch 404 and forward to error handler
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    const err: any = new Error('Not Found');
    err[status] = 404;
    next(err);
});

// error handler

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
        res.status(err[status] || 500);
        res.sendFile(path.join(__dirname, '../html', 'error.html'));
    });
}

// production error handler
// no stacktraces leaked to user
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(err.status || 500);
    httpDebug('Got the following error:');
    httpDebug(err);
    res.sendFile(path.join(__dirname, '../html', 'error.html'));
});

app.set('port', process.env.PORT );

startTempLogging();

const server = app.listen(app.get('port'), () => {
    httpDebug('Express server listening on port ' + process.env.PORT);
});
