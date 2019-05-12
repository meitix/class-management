import { Model } from 'mongoose';
import { Request, Response } from 'express';
import { IEntity } from '../models/interfaces/system/entity.interface';

export abstract class Controller<T extends IEntity> {
  Entity: Model<T>;

  // fetch all.
  async fetch(req: Request, res: Response) {
    let data = null;
    // check if there is od in params read by id.
    if (req.params.id) data = await this.Entity.findById(req.param('id'));
    // find by req.body in lack of id.
    else data = await this.Entity.find(req.body);
    
    res.send(data);
  }

  // create.
  create(req: Request, res: Response) {
    const entity = new this.Entity(req.body);
    entity
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
    this.Entity.findOneAndUpdate({ _id: id }, { $set: req.body })
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
    this.Entity.findOneAndDelete({ _id: id })
      .then(r => {
        res.json(r);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  }
}
