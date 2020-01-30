import { Router } from 'express';
import { RoleController } from '../controllers/auth/role.controller';
const authSuperAdmin = require('../middlewares/authSuperAdmin');
const authRoles = require('../middlewares/authPersonnel');

export class RoleRouter {
  router: Router;
  roleController: RoleController;

  constructor() {
    this.init();
    this.assignTheRoutesToController();
  }

  private init() {
    this.router = Router();
    this.roleController = new RoleController();
  }

  private assignTheRoutesToController() {
    this.router.get('/', authRoles, this.roleController.fetch);
    this.router.get('/:id', authSuperAdmin, this.roleController.fetch);
    this.router.post('/', authSuperAdmin, this.roleController.create);
    this.router.put('/:id', authSuperAdmin, this.roleController.update);
    this.router.delete('/:id', authSuperAdmin, this.roleController.delete);
  }
}

export default new RoleRouter().router;
