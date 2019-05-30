import { Router } from 'express';
import { SchoolController } from '../controllers/school.controller';
import { PeopleController } from '../controllers/people.controller';

class SchoolRouter {
    router: Router;
    private schoolController: SchoolController;
    private peopleController: PeopleController;

    constructor() {
        this.router = Router();
        this.schoolController = new SchoolController();
        this.peopleController = new PeopleController();
        this.init();
    }

    init() {
        // Schools functionality is here.
        // fetch.
        this.router.get('/' , this.schoolController.fetch);
        this.router.get('/:id' , this.schoolController.fetch);
        // create.
        this.router.post('/' , this.schoolController.create);
        // edit.
        this.router.put('/:id' , this.schoolController.edit);
        // delete.
        this.router.delete('/:id' , this.schoolController.delete);

        // Students.
        this.router.post('/:id/students' , this.peopleController.addStudent);
        this.router.get('/student/:studentId' , this.peopleController.getStudent)
        this.router.get('/:id/students' , this.peopleController.getStudents);
        this.router.put('/:id/student/:studentId' , this.peopleController.updateStudent);
        this.router.delete('/:id/student/:studentId' , this.peopleController.deleteStudent);
        
    }
}

export default new SchoolRouter().router;