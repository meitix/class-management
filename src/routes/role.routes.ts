import { Router } from "express";
import { RoleController } from "../controllers/auth/role.controller";


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
        this.router.get('/' , this.roleController.fetch);
        this.router.get('/:id' , this.roleController.fetch);
        this.router.post('/' , this.roleController.create);
        this.router.put('/:id' , this.roleController.update);
        this.router.delete('/:id' , this.roleController.delete);
    }
}

export default new RoleRouter().router;