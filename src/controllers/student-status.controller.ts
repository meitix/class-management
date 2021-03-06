import { Request, Response } from 'express';
import { StudentStatus } from '../models/entities/student-status.entity';

export class StudentStatusController {
  // find by query.
  async fetch(req: Request, res: Response) {
    const condition = Object.assign({}, req.query);
    condition.classId = req.params.classId;
    // convert date in query object from string to date format.
    if (condition.date) {
      condition.date = new Date(condition.date);
    }
    // get the result and send it to user as json file.
    const result = await StudentStatus.find(condition);
    res.json(result);
  }

  // create.
  async create(req: Request, res: Response) {
    try {
      const result = await StudentStatus.create(req.body);
      res.json(result);
    } catch (e) {
      res.status(400).json(e);
    }
  }

  // update.
  async updateById(req: Request, res: Response) {
    try {
      const result = await StudentStatus.updateOne(
        { _id: req.params.statusId },
        req.body
      );
      res.json(result);
    } catch (e) {
      res.status(400).json(e);
    }
  }

  // delete.
  async deleteById(req: Request, res: Response) {
    try {
      const result = await StudentStatus.deleteOne({
        _id: req.params.statusId
      });
      res.json(result);
    } catch (e) {
      res.status(400).json(e);
    }
  }
}
