import { Router } from 'express';
import { ClassStatusController } from '../controllers/class-status.controller';
import { StudentStatisticsController } from '../controllers/student-statistics.controller';

class ClassStatusRouter {
  router: Router;
  private classStatusController: ClassStatusController;
  private statisticsController: StudentStatisticsController;
  constructor() {
    this.init();
    this.assignTheRoutesToController();
  }

  private init() {
    this.router = Router();
    this.classStatusController = new ClassStatusController();
    this.statisticsController = new StudentStatisticsController();
  }

  private assignTheRoutesToController() {
    this.router.get('/', this.classStatusController.fetch);
    this.router.post('/', this.classStatusController.create);
    this.router.put('/:classStatusId/statistics', this.statisticsController.batchUpdate);
    this.router.put('/:classStatusId/statistics', this.statisticsController.getByClassStatusId);
  }
}

export default new ClassStatusRouter().router;
