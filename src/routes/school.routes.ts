import { Router } from 'express';
import { SchoolController } from '../controllers/school.controller';
import { PeopleController } from '../controllers/people.controller';
import classRoutes from './class.routes';
import periodRoutes from './period.routes';

class SchoolRouter {
    router: Router;
    private schoolController: SchoolController;
    private peopleController: PeopleController;

    constructor() {
        this.router = Router({mergeParams: true});
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
        this.router.put('/:id' , this.schoolController.update);
        // delete.
        this.router.delete('/:id' , this.schoolController.delete);

        // Students.
        this.router.post('/:id/students' , this.peopleController.addStudent);
        this.router.get('/student/:studentId' , this.peopleController.getStudent)
        this.router.get('/:id/students' , this.peopleController.getStudents);
        this.router.put('/:id/student/:studentId' , this.peopleController.updateStudent);
        this.router.delete('/:id/student/:studentId' , this.peopleController.deleteStudent);
        

        // Personnel.
        this.router.post('/:id/personnel' , this.peopleController.addPersonnel);
        this.router.get('/:id/personnel/:personnelId' , this.peopleController.getPersonnelById)
        this.router.get('/:id/personnel' , this.peopleController.getPersonnel);
        this.router.put('/:id/personnel/:personnelId' , this.peopleController.updatePersonnel);
        this.router.delete('/:id/personnel/:personnelId' , this.peopleController.deleteStudent);
        this.router.get('/:id/personnel/search/:term' , this.peopleController.search);
        
        // clas routes.
        this.router.use('/:id/classes', classRoutes);
        // period routes.
        this.router.use('/:id/periods', periodRoutes);
    }
}

export default new SchoolRouter().router;