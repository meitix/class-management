import { Request, Response } from 'express';
import { School, Period } from '../models/entities/school.entity';
import { Types } from 'mongoose';

export class PeriodController {
  constructor() {}

  async create(req: Request, res: Response) {
    const schoolId = req.params.id;

    try {
      if (!schoolId) {
        throw new Error('مدرسه مشخص نشده است.');
      }
      const period = new Period({ school: schoolId, title: req.body.title });
      const result = await period.save();

      res.json(result);
    } catch (e) {
      res.status(400).send(e);
    }
  }

  // fetch all of periods belong to an school by schoolId.
  async fetchAll(req: Request, res: Response) {
    const schoolId = req.params.id;

    try {
      if (!schoolId) {
        throw new Error('مدرسه مشخص نشده است.');
      }

      const result = await Period.find({
        school: new Types.ObjectId(schoolId)
      }).sort({_id: -1});

      res.json(result);
    } catch (e) {
      res.status(400).send(e);
    }
  }

  // fetch single school id and period id.
  async fetch(req: Request, res: Response) {
    const schoolId = req.params.id;
    const periodId = req.params.periodId;

    try {
      if (!schoolId || !periodId) {
        throw new Error('ورودی ها مشخص نشده است.');
      }

      const result = await Period.find({
        school: new Types.ObjectId(schoolId),
        _id: new Types.ObjectId(periodId)
      });

      res.json(result);
    } catch (e) {
      res.status(400).send(e);
    }
  }

  // fetch single school id and period id.
  async update(req: Request, res: Response) {
    const schoolId = req.params.id;
    const periodId = req.params.periodId;

    try {
      if (!schoolId || !periodId) {
        throw new Error('ورودی ها مشخص نشده است.');
      }

      const result = await Period.updateOne(
        {
          school: new Types.ObjectId(schoolId),
          _id: new Types.ObjectId(periodId)
        },
        req.body
      );

      res.json(result);
    } catch (e) {
      res.status(400).send(e);
    }
  }
  
  // delete single school id and period id.
  async delete(req: Request, res: Response) {
    const schoolId = req.params.id;
    const periodId = req.params.periodId;

    try {
      if (!schoolId || !periodId) {
        throw new Error('ورودی ها مشخص نشده است.');
      }

      const result = await Period.deleteOne(
        {
          school: new Types.ObjectId(schoolId),
          _id: new Types.ObjectId(periodId)
        });

      res.json(result);
    } catch (e) {
      res.status(400).send(e);
    }
  }
}
