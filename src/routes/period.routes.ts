import { Router } from 'express';
import { PeriodController } from '../controllers/period.controller';

export class PeriodRouter {
  router: Router;
  private periodController: PeriodController;
  constructor() {
    this.router = Router({mergeParams: true});
    this.periodController = new PeriodController();
    this.assignRoutesToController();
  }

  private assignRoutesToController() {
    this.router.get('/', this.periodController.fetchAll);
    this.router.get('/:periodId', this.periodController.fetch);
    this.router.post('/', this.periodController.create);
    this.router.put('/:periodId', this.periodController.update);
    this.router.delete('/:periodId', this.periodController.delete);
  }
}

export default new PeriodRouter().router;