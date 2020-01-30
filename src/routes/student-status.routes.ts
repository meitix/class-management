import { Router } from 'express';
import { ClassStatusController } from '../controllers/class-status.controller';
import { StudentStatisticsController } from '../controllers/student-statistics.controller';
const authClassStatistic = require('../middlewares/authClassStatistic');

class ClassStatusRouter {
  router: Router;
  private classStatusController: ClassStatusController;
  private statisticsController: StudentStatisticsController;
  constructor() {
    this.init();
    this.assignTheRoutesToController();
  }

  private init() {
    this.router = Router({ mergeParams: true });
    this.classStatusController = new ClassStatusController();
    this.statisticsController = new StudentStatisticsController();
  }

  private assignTheRoutesToController() {
    this.router.get('/', authClassStatistic, this.classStatusController.fetch);
    this.router.post(
      '/',
      authClassStatistic,
      this.classStatusController.create
    );
    this.router.get(
      '/:statusId',
      authClassStatistic,
      this.classStatusController.getById
    );
    this.router.put(
      '/:classStatusId/statistics',
      authClassStatistic,
      this.statisticsController.batchUpdate
    );
    this.router.get(
      '/:classStatusId/statistics',
      authClassStatistic,
      this.statisticsController.getByClassStatusId
    );
  }
}

export default new ClassStatusRouter().router;
