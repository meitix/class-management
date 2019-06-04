import { Request, Response } from 'express';
import { Person } from '../models/entities/people.schema';
import { IPerson } from '../models/interfaces/people/person.interface';
import { Types, Mongoose } from 'mongoose';
import * as _ from 'lodash';
import { School } from '../models/entities/school.entity';

export class PeopleController {
  // fetch all.
  async fetch(req: Request, res: Response) {
    let data = null;
    // check if there is id in params read by id.
    if (req.params.id) data = await Person.findById(req.param('id'));
    // find by req.body in lack of id.
    else {
      data = await Person.find(req.body);
    }
    res.send(data);
  }

  // create.
  create(req: Request, res: Response) {
    delete req.body._id;
    const person = new Person(req.body);
    person
      .save()
      .then(r => {
        res.json(r);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  }

  // edit.
  update(req: Request, res: Response) {
    const id = req.params.id;
    Person.findOneAndUpdate({ _id: id }, { $set: req.body })
      .then(r => {
        res.json(r);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  }

  // delete.
  delete(req: Request, res: Response) {
    const id = req.params.id;
    Person.findOneAndDelete({ _id: id })
      .then(r => {
        res.json(r);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  }

  // create student.
  async addStudent(req: Request, res: Response) {
    const schoolId = req.params.id;
    try {
      const studentVM = <IPerson>req.body;
      // fetch parent from db.
      let parent = await Person.findOne({
        nationalCode: studentVM.parent.nationalCode
      });
      // create new parent if is not already exists.
      if (!parent) parent = new Person(studentVM.parent);

      const student = new Person(req.body);
      student.schoolId = schoolId;
      parent.children.push(student);

      const result = await parent.save();

      console.log('result', result);
      res.json(result);
    } catch (e) {
      res.status(400).send(e);
    }
  }

  // get students by condition.
  async getStudents(req: Request, res: Response) {
    const schoolId = new Types.ObjectId(req.params.id);
    try {
      const result = await Person.find(
        { 'children.schoolId': schoolId },
        { children: 1 }
      );
      let students = _.flatten(result.map(r => r.children)).filter(c =>
        schoolId.equals(c.schoolId)
      );

      res.json(students);
    } catch (e) {
      res.status(500).send(e);
    }
  }

  // get single student.
  async getStudent(req: Request, res: Response) {
    try {
      const studentId = new Types.ObjectId(req.params.studentId);
      const parent = await Person.findOne(
        { 'children._id': studentId },
        {
          firstname: 1,
          lastname: 1,
          nationalCode: 1,
          mobile: 1,
          tel: 1,
          birthDate: 1,
          description: 1,
          children: 1
        }
      );
      const student = <any>(
        Object.assign({}, _.find(parent.children, { _id: studentId }))
      );
      delete parent.children;
      student.parent = parent;
      res.json(student);
    } catch (e) {
      res.status(400).send(e);
    }
  }

  // update student.
  async updateStudent(req: Request, res: Response) {
    try {
      delete req.body.parent;
      if (req.body.schoolId)
        req.body.schoolId = new Types.ObjectId(req.body.schoolId);

      const result = await Person.updateOne(
        { 'children._id': Types.ObjectId(req.params.studentId) },
        { $set: { 'children.$': req.body } }
      );
      res.json(result);
    } catch (err) {
      res.status(400).send(err);
    }
  }

  // delete student.
  async deleteStudent(req: Request, res: Response) {
    try {
      const studentId = new Types.ObjectId(req.params.studentId);
      const result = await Person.updateOne(
        { 'children._id': studentId },
        { $pull: { children: { _id: studentId } } }
      );
      res.json(result);
    } catch (err) {
      res.status(400).send(err);
    }
  }

  // get personnel of an school with school id.
  async getPersonnel(req: Request, res: Response) {
    const schoolId = req.params.id;
    try {
      const result = await School.findById(schoolId)
        .populate('personnel.person')
        .populate('personnel.roles')
        .select({ personnel: 1 });
      res.json(result.personnel);
    } catch (e) {
      res.status(400).send(e);
    }
  }
  async getPersonnelById(req: Request, res: Response) {
    const schoolId = req.params.id;
    try {
      const result = await School.findOne({ _id: new Types.ObjectId(schoolId) })
        .populate('personnel.person')
        .populate('personnel.roles')
        .select({ personnel: 1 });
      res.json(result.personnel[0]);
    } catch (e) {
      res.status(400).send(e);
    }
  }

  // add personnel to school.
  async addPersonnel(req: Request, res: Response) {
    const schoolId = new Types.ObjectId(req.params.id);
    const person = new Person(req.body.person);
    try {
      await person.save();
      const result = await School.updateOne(
        { _id: schoolId },
        {
          $push: { personnel: { person: person._id, roles: req.body.roleIds } }
        }
      );
      res.json(result);
    } catch (e) {
      res.status(500).send(e);
    }
  }

  // add personnel to school.
  async updatePersonnel(req: Request, res: Response) {
    const schoolId = new Types.ObjectId(req.params.id);
    const personId = new Types.ObjectId(req.body.person._id);
    delete req.body.person._id;
    try {
      Person.updateOne({ _id: personId }, req.body.person).exec();
      const result = await School.updateOne(
        { _id: schoolId, 'personnel.person': personId },
        { $set: { 'personnel.$.roles': req.body.roleIds } }
      );
      res.json(result);
    } catch (e) {
      res.send(e);
    }
  }
}
