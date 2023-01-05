import { Router } from 'express';
import MenuRoute from '@src/route/menu';

const router: Router = Router();

router.use('/menu', MenuRoute);

export default router;