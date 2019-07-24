import { Router } from 'express';
import { ClassStatusController } from '../controllers/class-status.controller';

class ClassStatusRouter {
  router: Router;
  private classStatusController: ClassStatusController;

  constructor() {
    this.init();
    this.assignTheRoutesToController();
  }

  private init() {
    this.router = Router();
    this.classStatusController = new ClassStatusController();
  }

  private assignTheRoutesToController() {
    this.router.get('/', this.classStatusController.fetch);
    this.router.post('/', this.classStatusController.create);
  }
}

export default new ClassStatusRouter().router;
