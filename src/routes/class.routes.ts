import { Router } from 'express';
import { ClassController } from '../controllers/class.controller';
import studentStatusRouter from './student-status.routes';
const authClass = require('../middlewares/authClass');
const authClassStatistic = require('../middlewares/authClassStatistic');

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
    this.router.get('/', authClassStatistic, this.classController.fetch);
    this.router.get(
      '/:classId',
      authClassStatistic,
      this.classController.fetch
    );
    this.router.post('/', authClass, this.classController.create);
    this.router.put('/:classId', authClass, this.classController.update);
    this.router.delete('/:classId', authClass, this.classController.delete);

    // importing student statuses routes.
    this.router.use('/:classId/status', studentStatusRouter);
  }
}

export default new RoleRouter().router;
