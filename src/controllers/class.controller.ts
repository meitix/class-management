import { Request, Response } from "express";
import { Class } from "../models/entities/class.entity";
import { Types } from "mongoose";
import { School } from "../models/entities/school.entity";

export class ClassController {
  async fetch(req: Request, res: Response) {
    try {
    let data = null;
    // check if there is id in params read by id.
    if (req.params.classId) data = await Class.findById(req.params.classId).populate('teacher');
    // find by req.body in lack of id.
    else {
      const schoolId = new Types.ObjectId(req.params.id);
      const condition = { school: schoolId , ...req.body};
      data = await Class.find(condition).populate('teacher' , {firstname: 1, lastname: 1}).populate('period').populate('grade',{title: 1}).exec();
    }
    res.send(data);
  } catch (e) {
    res.status(400).send(e);
  }
  }

  // create.
  async create(req: Request, res: Response) {
    delete req.body._id;
    const schoolId = req.params.id;
    // school id validation.
    if(!schoolId) {
      throw new Error('مدرسه مشخص نشده است');
    }
    req.body.school = schoolId;
    const _class = new Class(req.body);
    try {
      const result = await _class.save();

      res.json(result);
    } catch (err) {
      res.status(400).send(err);
    }
  }

  // edit.
  async update(req: Request, res: Response) {
    const id = req.params.classId;
    try {
      const result = await Class.findOneAndUpdate(
        { _id: id },
        { $set: req.body }
      );

      res.json(result);
    } catch (err) {
      res.status(400).send(err);
    }
  }

  // delete.
  async delete(req: Request, res: Response) {
    const id = req.params.classId;
    try {
      const result = await Class.deleteOne({ _id: id });
      res.json(result);
    } catch (err) {
      res.status(400).send(err);
    }
  }
}
