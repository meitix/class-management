import { Router } from 'express';
import schoolRoutes from './school.routes';

class SchoolManagementRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  init() {
      this.router.use('/school' , schoolRoutes);
  } 
}

export default new SchoolManagementRouter().router;