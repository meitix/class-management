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
        // Schools functionality is here.
        // fetch.
        this.router.get('/' , this.controller.fetch);
        this.router.get('/:id' , this.controller.fetch);
        // create.
        this.router.post('/' , this.controller.create);
        // edit.
        this.router.put('/:id' , this.controller.edit);
        // delete.
        this.router.delete('/:id' , this.controller.delete);

        // Students.
        // create student.
        this.router.post('/:id/students' , this.controller.addStudent);
        this.router.get('/:id/students' , this.controller.getStudents);
        this.router.put('/:id/student/:studentId' , this.controller.updateStudent);
        this.router.delete('/:id/student/:studentId' , this.controller.deleteStudent);
        
    }
}

export default new SchoolRouter().router;