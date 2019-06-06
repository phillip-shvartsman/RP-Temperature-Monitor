import * as express from 'express';
import * as DB from '../../db/db';

import { NextFunction } from 'connect';
import Settings from '../../common/Settings';

const router = express.Router();

router.post('/get', async (req: express.Request, res: express.Response, next: NextFunction) => {
    try {
        const settings: Settings = await DB.getSettings();
        res.send({settings});
    } catch (err) {
        next(err);
    }
});

router.post('/set', async (req: express.Request, res: express.Response, next: NextFunction) => {
    try {
        const settings = new Settings(req.body.tempUnit);
        await DB.setSettings(settings);
        res.end();
    } catch (err) {
        next(err);
    }
});

export default router;
