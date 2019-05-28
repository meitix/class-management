import { Request, Response } from "express";
import { School } from "../models/entities/school.entity";
import { Person } from "../models/entities/people.schema";
import { IPerson } from "../models/interfaces/people/person.interface";
import { Types } from "mongoose";
import * as _ from 'lodash';

export class SchoolController {
  constructor() {}

  // fetch all.
  async fetch(req: Request, res: Response) {
    let data = null;
    // check if there is id in params read by id.
    if (req.params.id) data = await School.findById(req.param("id"));
    // find by req.body in lack of id.
    else {
      if (School) data = await School.find(req.body);
      else console.log(`School is null.`);
    }
    res.send(data);
  }

  // create.
  create(req: Request, res: Response) {
    const school = new School(req.body);
    school
      .save()
      .then(r => {
        res.json(r);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  }

  // edit.
  edit(req: Request, res: Response) {
    const id = req.params.id;
    School.findOneAndUpdate({ _id: id }, { $set: req.body })
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
    School.findOneAndDelete({ _id: id })
      .then(r => {
        res.json(r);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  }
  // ----
  // Students.
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

    console.log("result", result);
    res.json(result);
    } catch (e) {
      res.status(400).send(e);
    }
  }

  // get students by condition.
  async getStudents(req: Request, res: Response) {
    const schoolId = req.params.id;
    try {
      const result = await Person.find({'children.schoolId': Types.ObjectId(schoolId)}, {children: 1});
      const students = _.flatten(result.map(r => r.children));
      res.json(students);
    } catch (e) {
      res.status(500).send(e);
    }
  }
  // update student.
  async updateStudent(req: Request, res: Response) {
    try {
      const result = await Person.findOneAndUpdate({'children.id':req.params.userId}, {$set:{ 'children.$': req.body}});
      res.json(result);
    } catch (err) {
      res.status(400).send(err);
    }
  }

  // delete student.
  async deleteStudent(req: Request, res: Response) {
    try {
      const studentId = new Types.ObjectId(req.params.studentId);
      const result = await Person.updateOne({'children._id': studentId}, {$pull: {children: {_id: studentId}}});
      res.json(result);
    } catch (err) {
      res.status(400).send(err);
    }
  }
}
