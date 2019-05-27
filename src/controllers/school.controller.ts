import { Request, Response } from "express";
import { School } from "../models/entities/school.entity";
import { Person } from "../models/entities/people.schema";
import schoolRoutes from "../routes/school.routes";

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
    console.log(req.body);
    try {
      debugger;
      const student = new Person(req.body);
      const result = await School.findOneAndUpdate(
        { id: req.params.id },
        { $push: { students: student } }
      );
      console.log('result', result);
      res.json(result);
    } catch (e) {
      res.status(400).send(e);
    }
  }

  // get students by condition.
  async getStudents(req: Request , res:Response) {
      try {
        const result = await School.find(req.body);
        res.json(result);
      } catch(e) {
          res.status(500).send(e);
      }
  }
  // update student.
  async updateStudent(req: Request, res: Response) {
      try{
          const result = await Person.findOneAndUpdate(req.param('userId'), req.body);
          res.json(result);
      } catch(err) {
        res.status(400).send(err);
      }
  }

  // delete student.
  async deleteStudent(req: Request, res: Response) {
    try{
        const result = await Person.findOneAndUpdate(req.param('userId'), req.body);
        res.json(result);
    } catch(err) {
      res.status(400).send(err);
    }
}
}
