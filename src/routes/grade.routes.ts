import { Router } from 'express';
import { GradeController } from '../controllers/grade.controller';

export class RoleRouter {
  router: Router;
  gradeController: GradeController;

  constructor() {
    this.init();
    this.assignTheRoutesToController();
  }

  private init() {
    this.router = Router();
    this.gradeController = new GradeController();
  }

  private assignTheRoutesToController() {
    this.router.get('/', this.gradeController.fetch);
    this.router.get('/:id', this.gradeController.fetch);
    this.router.post('/', this.gradeController.create);
    this.router.put('/:id', this.gradeController.update);
    this.router.delete('/:id', this.gradeController.delete);
  }
}

export default new RoleRouter().router;
