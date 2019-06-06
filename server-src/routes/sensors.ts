import * as express from 'express';
import * as DB from '../../db/db';

import debug from 'debug';
import SensorData from '../../common/SensorData';

const dbLogDebug = debug('database:logs');

const router = express.Router();

router.post('/get', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const sensorData: SensorData[] = await DB.getSensors();
        res.send({sensorData});
    } catch (err) {
        next(err);
    }
});

export default router;
