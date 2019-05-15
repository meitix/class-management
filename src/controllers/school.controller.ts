import {Request , Response } from 'express';
import { School } from '../models/entities/school.entity';

export class SchoolController {
  constructor() {
  }
  
  // fetch all.
  async fetch(req: Request, res: Response) {
    let data = null;
    // check if there is id in params read by id.
    if (req.params.id) data = await School.findById(req.param('id'));
    // find by req.body in lack of id.
    else {
      if(School)
      data = await School.find(req.body);
      else console.log(`School is null.`)
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
}
