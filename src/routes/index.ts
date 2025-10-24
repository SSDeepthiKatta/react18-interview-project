import { Router, Request, Response } from 'express';

class IndexController {
    getIndex(req: Request, res: Response) {
        res.send('OK');
    }
}

const router = Router();
const indexController = new IndexController();

export function setRoutes(app: any) {
    app.use('/', router);
    router.get('/', indexController.getIndex.bind(indexController));
}