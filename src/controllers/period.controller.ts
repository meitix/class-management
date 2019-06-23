import { Request, Response } from 'express';
import { School, Period } from '../models/entities/school.entity';
import { Types } from 'mongoose';

export class PeriodController {
  constructor() {}

  async addPeriod(req: Request, res: Response) {
    const schoolId = req.params.id;
    if (!schoolId) {
     throw new Error('مدرسه مشخص نشده است.');
    }
    try {
      const period = new Period({ title: req.body.title });
      const result = await School.updateOne(
        { _id: Types.ObjectId(schoolId) },
        { $push: { periods: period } }
      );
      res.json(result);
    } catch (e) {
      res.status(400).send(e);
    }
  }
}
