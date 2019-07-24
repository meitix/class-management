import { Router } from 'express';
import { AuthController } from '../controllers/auth';

export class RoleRouter {
  router: Router;
  authController: AuthController;

  constructor() {
    this.init();
    this.assignTheRoutesToController();
  }

  private init() {
    this.router = Router();
    this.authController = new AuthController();
  }

  private assignTheRoutesToController() {
    this.router.post('/login', this.authController.login);
  }
}

export default new RoleRouter().router;
