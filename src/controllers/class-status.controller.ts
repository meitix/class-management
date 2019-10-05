import { Request, Response } from 'express';
import { ClassStatus } from '../models/entities/student-status.entity';
import { Types } from 'mongoose';

export class ClassStatusController {
  // find by query.
  async fetch(req: Request, res: Response) {
    const condition = Object.assign({}, req.query);
    condition.class = new Types.ObjectId(req.params.classId);
    // convert date in query object from string to date format.
    if (condition.date) {
      condition.date = new Date(condition.date);
    }
    try {
      // get the result and send it to user as json file.
      const result = await ClassStatus.find(condition).select({ date: 1 });
      res.json(result);
    } catch (e) {
      console.log(e);
      res.status(500).send(e);
    }
  }

  // create.
  async create(req: Request, res: Response) {
    try {
      const classStatus = req.body;
      const result = await ClassStatus.create(classStatus);
      res.json(result);
    } catch (e) {
      res.status(400).json(e);
    }
  }

  async getById(req: Request, res: Response) {
    const statusId = req.params.statusId;
    try {
      const status = await ClassStatus.findById(statusId);
      res.json(status);
    } catch (e) {
      console.log(e);
      res.status(500).send(e);
    }
  }

  // update.
  async updateById(req: Request, res: Response) {
    try {
      const result = await ClassStatus.updateOne(
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
      const result = await ClassStatus.deleteOne({
        _id: req.params.statusId
      });
      res.json(result);
    } catch (e) {
      res.status(400).json(e);
    }
  }
}
