import { Router } from 'express';
import { SchoolController } from '../controllers/school.controller';
import { PeopleController } from '../controllers/people.controller';
import classRoutes from './class.routes';
import periodRoutes from './period.routes';
const authPersonnel = require('../middlewares/authPersonnel');
const authStudent = require('../middlewares/authClass');
const authَAdmin = require('../middlewares/authAdmin');
const authSuperAdmin = require('../middlewares/authSuperAdmin');

class SchoolRouter {
  router: Router;
  private schoolController: SchoolController;
  private peopleController: PeopleController;

  constructor() {
    this.router = Router({ mergeParams: true });
    this.schoolController = new SchoolController();
    this.peopleController = new PeopleController();
    this.init();
  }

  init() {
    // Schools functionality is here.
    // fetch.
    this.router.get('/', authَAdmin, this.schoolController.fetch);
    this.router.get('/:id', authَAdmin, this.schoolController.fetch);
    // create.
    this.router.post('/', authSuperAdmin, this.schoolController.create);
    // edit.
    this.router.put('/:id', authَAdmin, this.schoolController.update);
    // delete.
    this.router.delete('/:id', authSuperAdmin, this.schoolController.delete);

    // Students.
    this.router.post(
      '/:id/students',
      authStudent,
      this.peopleController.addStudent
    );
    this.router.get(
      '/student/:studentId',
      authStudent,
      this.peopleController.getStudent
    );
    this.router.get(
      '/:studentCode/student',
      authStudent,
      this.peopleController.getStudentByCode
    );
    this.router.get(
      '/:id/students',
      authStudent,
      this.peopleController.getStudents
    );
    this.router.put(
      '/:id/student/:studentId',
      authStudent,
      this.peopleController.updateStudent
    );
    this.router.delete(
      '/:id/student/:studentId',
      authStudent,
      this.peopleController.deleteStudent
    );

    // Personnel.
    this.router.post(
      '/:id/personnel',
      authPersonnel,
      this.peopleController.addPersonnel
    );
    this.router.get(
      '/:id/personnel/:personnelId',
      authPersonnel,
      this.peopleController.getPersonnelById
    );
    this.router.get(
      '/:id/:personnelCode/personnel',
      authPersonnel,
      this.peopleController.getPersonnelByCode
    );
    this.router.get(
      '/:id/personnel',
      authPersonnel,
      this.peopleController.getPersonnel
    );
    this.router.put(
      '/:id/personnel/:personnelId',
      authPersonnel,
      this.peopleController.updatePersonnel
    );
    this.router.delete(
      '/:id/personnel/:personnelId',
      authPersonnel,
      this.peopleController.deletePersonnel
    );
    this.router.get(
      '/:id/personnel/search/:term',
      this.peopleController.search
    );

    // class routes.
    this.router.use('/:id/classes', classRoutes);
    // period routes.
    this.router.use('/:id/periods', periodRoutes);
  }
}

export default new SchoolRouter().router;
