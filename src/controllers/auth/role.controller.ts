import { Request, Response } from "express";
import { Role } from "../../models/entities/role.entity";

export class RoleController {
  async fetch(req: Request, res: Response) {
    let data = null;
    // check if there is id in params read by id.
    if (req.params.id) data = await Role.findById(req.params.id);
    // find by req.body in lack of id.
    else {
      data = await Role.find(req.body);
    }
    res.send(data);
  }

  // create.
  async create(req: Request, res: Response) {
    delete req.body._id;
    const role = new Role(req.body);
    try {
      const result = await role.save();
      res.json(result);
    } catch (err) {
      res.status(400).send(err);
    }
  }

  // edit.
  async update(req: Request, res: Response) {
    const id = req.params.id;
    try {
      const result = await Role.findOneAndUpdate(
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
      const result = await Role.findOneAndDelete({ _id: id });
      res.json(result);
    } catch (err) {
      res.status(400).send(err);
    }
  }
}
