import { Router } from 'express';
import { StudentStatusController } from '../controllers/student-status.controller';

class StudentStatusRouter {
  router: Router;
  private studentStatusController: StudentStatusController;

  constructor() {
    this.init();
    this.assignTheRoutesToController();
  }

  private init() {
    this.router = Router();
    this.studentStatusController = new StudentStatusController();
  }

  private assignTheRoutesToController() {
    this.router.get('/', this.studentStatusController.fetch);
    this.router.post('/', this.studentStatusController.create);
  }
}

export default new StudentStatusRouter().router;
