import { Request, Response } from "express";
import { Person } from "../models/entities/people.schema";
import { IPerson } from "../models/interfaces/people/person.interface";
import { Types } from "mongoose";
import * as _ from "lodash";

export class PeopleController {
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
    const schoolId = new Types.ObjectId(req.params.id);
    try {
      const result = await Person.find(
        { "children.schoolId": schoolId},
        { "children": 1}
      );
      let students = _.flatten(result.map(r => r.children)).filter(c => schoolId.equals(c.schoolId));

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
        { "children._id": studentId },
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
      const student = <any>Object.assign({}, _.find(parent.children , {_id: studentId}));
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
        { "children._id": Types.ObjectId(req.params.studentId) },
        { $set: { "children.$": req.body } }
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
        { "children._id": studentId },
        { $pull: { children: { _id: studentId } } }
      );
      res.json(result);
    } catch (err) {
      res.status(400).send(err);
    }
  }
}
