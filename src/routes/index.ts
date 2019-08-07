import { Router } from 'express';
import schoolRoutes from './school.routes';
import roleRouter from './role.routes';
import gradeRouter from './grade.routes';
import authRoutes from './auth.routes';
import * as jwt from 'express-jwt';
import { readFileSync } from 'fs';
import { resolve } from 'path';

class SchoolManagementRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  init() {

    this.router.use('/auth', authRoutes);
    
    // use jwt.
    this.router.use(
      jwt({ secret: readFileSync( resolve(__dirname , '../config/settings/jwt-secret.key')) }).unless(
        { path: ['/auth'] }
      )
    );

    this.router.use('/school', schoolRoutes);
    this.router.use('/roles', roleRouter);
    this.router.use('/grades', gradeRouter);
    
  }
}

export default new SchoolManagementRouter().router;
