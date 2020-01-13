import { Schema, Model, model } from 'mongoose';
import { IPerson } from '../interfaces/people/person.interface';

export const PersonSchema = new Schema({
  code: {
    index: true,
    type: String,
    minlength: 5,
    maxlength: 9,
    unique: true,
    required: true
  },
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
    minlength: 10,
    maxlength: 10,
    unique: true,
    required: true
  },
  mobile: {
    type: String,
    required: true
  },
  tel: { type: String, required: true },
  birthDate: Date,
  description: String
});

export const Person: Model<IPerson> = model<IPerson>('Person', PersonSchema);
