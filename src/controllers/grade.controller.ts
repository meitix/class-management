import { Request, Response } from "express";
import { Grade } from "../models/entities/grade.entity";

export class GradeController {
  async fetch(req: Request, res: Response) {
    let data = null;
    // check if there is id in params read by id.
    if (req.params.id) data = await Grade.findById(req.params.id);
    // find by req.body in lack of id.
    else {
      data = await Grade.find(req.body).select({title: 1, description: 1});
    }
    res.send(data);
  }

  // create.
  async create(req: Request, res: Response) {
    delete req.body._id;
    const grade = new Grade(req.body);
    try {
      const result = await grade.save();
      res.json(result);
    } catch (err) {
      res.status(400).send(err);
    }
  }

  // edit.
  async update(req: Request, res: Response) {
    const id = req.params.id;
    try {
      const result = await Grade.findOneAndUpdate(
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
      const result = await Grade.deleteOne({ _id: id });
      res.json(result);
    } catch (err) {
      res.status(400).send(err);
    }
  }
}
