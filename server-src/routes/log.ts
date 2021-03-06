import debug from 'debug';
import * as express from 'express';

import LogEntry from '../../common/LogEntry';

import * as DB from '../../db/db';

const dbLogDebug = debug('database:logs');

const router = express.Router();

router.post('/get', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        dbLogDebug('Requesting logs for the following date:', req.body);
        const logEntries: LogEntry[] = await DB.getLogs(req.body.date);
        res.send({log: logEntries});
    } catch (err) {
        dbLogDebug(err);
        next(err);
    }
});

export default router;
