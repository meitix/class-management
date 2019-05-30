import { Schema, Model, model } from 'mongoose';
import { IPerson } from '../interfaces/people/person.interface';

export const PersonSchema = new Schema({
  code: {type: String, required: true},
  schoolId: {type: Schema.Types.ObjectId , ref: 'School'},
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
    maxLength: 10,
    minLength: 10
  },
  mobile: {
    type: String
  },
  tel: String,
  birthDate: Date,
  roles: [{title: String}],
  description: String,
  children: [Object]
});

export const Person: Model<IPerson> = model<IPerson>('Person', PersonSchema);
