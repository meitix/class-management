import { Request, Response } from 'express';
import { School, Period } from '../models/entities/school.entity';
import { Types } from 'mongoose';

export class SchoolController {
  constructor() {}

  // fetch all.
  async fetch(req: Request, res: Response) {
    let data = null;
    // check if there is id in params read by id.
    if (req.params.id) data = await School.findById(req.param('id'));
    // find by req.body in lack of id.
    else {
      data = await School.find(req.body);
    }
    res.send(data);
  }

  // create.
  create(req: Request, res: Response) {
    // delete req.body._id;
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
  update(req: Request, res: Response) {
    const id = req.params.id;
    School.findOneAndUpdate(
      { _id: id },
      { $set: req.body },
      { runValidators: true }
    )
      .then(r => {
        res.json(r);
      })
      .catch(err => {
        res.status(400).send(err.codeName);
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
}
