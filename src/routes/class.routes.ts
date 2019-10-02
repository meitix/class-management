import { Router } from 'express';
import { ClassController } from '../controllers/class.controller';
import studentStatusRouter from './student-status.routes';

export class RoleRouter {
  router: Router;
  classController: ClassController;

  constructor() {
    this.init();
    this.assignTheRoutesToController();
  }

  private init() {
    this.router = Router({ mergeParams: true });
    this.classController = new ClassController();
  }

  private assignTheRoutesToController() {
    this.router.get('/', this.classController.fetch);
    this.router.get('/:classId', this.classController.fetch);
    this.router.post('/', this.classController.create);
    this.router.put('/:classId', this.classController.update);
    this.router.delete('/:classId', this.classController.delete);
    
    // importing student statuses routes.
    this.router.use('/:classId/status', studentStatusRouter);
  }
}

export default new RoleRouter().router;
