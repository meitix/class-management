import { Router } from 'express';
import { GradeController } from '../controllers/grade.controller';
const authSuperAdmin = require('../middlewares/authSuperAdmin');
const authGrade = require('../middlewares/authClass');

export class GradeRouter {
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
    this.router.get('/', authGrade, this.gradeController.fetch);
    this.router.get('/:id', authSuperAdmin, this.gradeController.fetch);
    this.router.post('/', authSuperAdmin, this.gradeController.create);
    this.router.put('/:id', authSuperAdmin, this.gradeController.update);
    this.router.delete('/:id', authSuperAdmin, this.gradeController.delete);
  }
}

export default new GradeRouter().router;
