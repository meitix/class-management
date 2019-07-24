import { Schema, Model, model } from 'mongoose';
import { IPerson } from '../interfaces/people/person.interface';

export const PersonSchema = new Schema({
  code: {type: String, required: true, index: true},
  firstname: {
    index: true,
    type: String,
    required: true
  },
  lastname: {
    index: true,
    type: String,
    required: true
  },
  nationalCode: {
    index: true,
    type: String,
    maxLength: 10,
    minLength: 10
  },
  mobile: {
    type: String
  },
  tel: String,
  birthDate: Date,
  description: String
});

export const Person: Model<IPerson> = model<IPerson>('Person', PersonSchema);
