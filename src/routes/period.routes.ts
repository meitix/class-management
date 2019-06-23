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
    this.router.post('/', this.periodController.addPeriod);
  }
}

export default new PeriodRouter().router;