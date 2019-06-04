import { Schema, Model, model } from "mongoose";
import { IRole } from "../interfaces/auth/role.interface";

export const RoleSchema = new Schema({
  title: { type: String, required: true },
  accessibility: {
    type: [{ title: String, accessLevel: Number , text: String}],
    required: true
  }
});

export const Role: Model<IRole> = model<IRole>("Role", RoleSchema);
