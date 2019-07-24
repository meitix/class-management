import { Router } from 'express';
import schoolRoutes from './school.routes';
import roleRouter from './role.routes';
import gradeRouter from './grade.routes';
import authRoutes from './auth.routes';

class SchoolManagementRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  init() {
    this.router.use('/school', schoolRoutes);
    this.router.use('/roles', roleRouter);
    this.router.use('/grades', gradeRouter);
    this.router.use('/auth' , authRoutes);
  }
}

export default new SchoolManagementRouter().router;
