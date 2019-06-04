import { Router } from 'express';
import schoolRoutes from './school.routes';
import roleRouter from './role.routes';
import classRouter from './class.routes';
import gradeRouter from './grade.routes';

class SchoolManagementRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  init() {
    this.router.use('/school', schoolRoutes);
    this.router.use('/roles', roleRouter);
    this.router.use('/grade', gradeRouter);
    this.router.use('/class', classRouter);
  }
}

export default new SchoolManagementRouter().router;
