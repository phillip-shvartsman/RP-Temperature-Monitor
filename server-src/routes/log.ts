import * as express from 'express';
import * as DB from '../../db/db';
import LogEntry from '../../common/LogEntry';
import debug from 'debug';

const dbLogDebug = debug('database:logs');

const router = express.Router();

router.post('/get/today', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const logEntries: LogEntry[] = await DB.getTodayLog();
        res.send({log: logEntries});
    } catch (err) {
        dbLogDebug(err);
        next(err);
    }
});

export default router;
