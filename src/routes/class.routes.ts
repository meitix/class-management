import { Router } from 'express';
import { ClassController } from '../controllers/class.controller';

export class RoleRouter {
  router: Router;
  classController: ClassController;

  constructor() {
    this.init();
    this.assignTheRoutesToController();
  }

  private init() {
    this.router = Router();
    this.classController = new ClassController();
  }

  private assignTheRoutesToController() {
    this.router.get('/', this.classController.fetch);
    this.router.get('/:id', this.classController.fetch);
    this.router.post('/', this.classController.create);
    this.router.put('/:id', this.classController.update);
    this.router.delete('/:id', this.classController.delete);
  }
}

export default new RoleRouter().router;
