import { Router } from 'express';
import { SchoolController } from '../controllers/school.controller';

class SchoolRouter {
    router: Router;
    private controller: SchoolController;

    constructor() {
        this.router = Router();
        this.controller = new SchoolController();
        this.init();
    }

    init() {
        // fetch.
        this.router.get('/' , this.controller.fetch);
        this.router.get('/:id' , this.controller.fetch);
        // create.
        this.router.post('/' , this.controller.create);
        // edit.
        this.router.put('/:id' , this.controller.edit);
        // delete.
        this.router.delete('/:id' , this.controller.delete);
    }
}

export default new SchoolRouter().router;