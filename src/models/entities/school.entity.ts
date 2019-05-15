import { Schema, model, Model } from 'mongoose';
import { ISchool } from '../interfaces/edu/school.interface';
import { PersonSchema } from './people.schema';

export const SchoolSchema = new Schema({
  code: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  isEnable: {
    type: Boolean,
    required: true
  },
  boardOfTrust: String,
  presonel: [PersonSchema],
  students: [PersonSchema]
});

export const School: Model<ISchool> = model<ISchool>('School', SchoolSchema);
