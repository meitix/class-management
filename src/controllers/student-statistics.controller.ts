import { Request, Response } from 'express';
import {
  ClassStatus,
  StudentStatusSchema
} from '../models/entities/student-status.entity';
import { Types } from 'mongoose';

export class StudentStatisticsController {
  async batchUpdate(req: Request, res: Response) {
    const classStatusId = req.params.classStatusId;
    try {
      const result = await ClassStatus.updateOne({_id: new Types.ObjectId(classStatusId)}, {
        $set: { statistics: req.body }
      });
      res.send(result);
    } catch (e) {
      console.log(e);
      res.status(400).send(e);
    }
  }

  // get by student id.
  async getByStudentId(req: Request, res: Response) {
    try {
      const result = await ClassStatus.find(
        { 'statistics.student': req.params.studentId },
        { 'statistic.$.result': 1 }
      );
      res.json(result);
    } catch (e) {
      console.log(e);
      res.status(400).json(e);
    }
  }

  // get by class status id.
  async getByClassStatusId(req: Request, res: Response) {
    try {
      const result = await ClassStatus.findById(req.params.classStatusId);
      res.json(result);
    } catch (e) {
      console.log(e);
      res.status(400).json(e);
    }
  }
}
