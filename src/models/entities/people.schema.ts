import { Schema, Model, model, Types } from 'mongoose';
import { IPerson } from '../interfaces/people/person.interface';

export const PersonSchema = new Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  nationalCode: {
    type: String,
    maxLenghth: 10,
    minLength: 10
  },
  mobile: {
    type: String
  },
  tel: String,
  birthDate: Date,
  roles: [{title: String}],
  description: String,
  parent: Object,
  children: [Object]
});

export const Person: Model<IPerson> = model<IPerson>('Person', PersonSchema);
