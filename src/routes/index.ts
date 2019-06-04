import { Router } from 'express';
import schoolRoutes from './school.routes';
import roleRouter from './role.routes';

class SchoolManagementRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  init() {
    this.router.use('/school', schoolRoutes);
    this.router.use('/roles', roleRouter);
  }
}

export default new SchoolManagementRouter().router;
