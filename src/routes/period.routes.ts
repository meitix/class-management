import { Router } from 'express';
import { PeriodController } from '../controllers/period.controller';
const authSuperAdmin = require('../middlewares/authSuperAdmin');

export class PeriodRouter {
  router: Router;
  private periodController: PeriodController;
  constructor() {
    this.router = Router({ mergeParams: true });
    this.periodController = new PeriodController();
    this.assignRoutesToController();
  }

  private assignRoutesToController() {
    this.router.get('/', this.periodController.fetchAll);
    this.router.get('/:periodId', this.periodController.fetch);
    this.router.post('/', authSuperAdmin, this.periodController.create);
    this.router.put('/:periodId', authSuperAdmin, this.periodController.update);
    this.router.delete(
      '/:periodId',
      authSuperAdmin,
      this.periodController.delete
    );
  }
}

export default new PeriodRouter().router;
