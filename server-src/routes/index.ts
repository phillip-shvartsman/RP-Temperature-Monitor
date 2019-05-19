import * as express from 'express';
import * as path from 'path';

const router = express.Router();

router.get('/', (req: express.Request, res: express.Response) => {
    res.sendFile(path.join(__dirname, '../html/', 'index.html'));
});


export default router;
