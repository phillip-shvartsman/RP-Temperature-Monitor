import * as express from 'express';
import * as DB from '../../db/db';

import debug from 'debug';
import SensorData from '../../common/SensorData';

const dbLogDebug = debug('database:logs');

const router = express.Router();

router.post('/get', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        dbLogDebug('Sensor Data Requested');
        const sensorData: SensorData[] = await DB.getSensors();
        dbLogDebug('Got the following sensor data', sensorData);
        res.send({sensorData});
    } catch (err) {
        next(err);
    }
});

router.post('/rename', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        dbLogDebug('Renaming sensor', req.body.SensorData);
        dbLogDebug('New name is,', req.body.newName);
        await DB.changeSensorName(req.body.newName, req.body.sensorData);
        res.end();
    } catch (err) {
        next(err);
    }
});

export default router;
