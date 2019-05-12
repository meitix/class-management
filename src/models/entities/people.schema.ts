import { Schema, Model, model } from 'mongoose';
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
  }
});

export const Person: Model<IPerson> = model<IPerson>('Person', PersonSchema);
