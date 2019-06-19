import { Request, Response } from "express";
import { Class } from "../models/entities/class.entity";

export class ClassController {
  async fetch(req: Request, res: Response) {
    let data = null;
    // check if there is id in params read by id.
    if (req.params.id) data = await Class.findById(req.params.id).populate('teacher');
    // find by req.body in lack of id.
    else {
      data = await Class.find(req.body).populate('teacher').populate('grade').exec();
    }
    res.send(data);
  }

  // create.
  async create(req: Request, res: Response) {
    delete req.body._id;
    const schoolId = req.params.id;
    // school id validation.
    if(!schoolId) {
      res.status(400).send('مدرسه مشخص نشده است');
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
    const id = req.params.id;
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
    const id = req.params.id;
    try {
      const result = await Class.deleteOne({ _id: id });
      res.json(result);
    } catch (err) {
      res.status(400).send(err);
    }
  }
}
