import { Schema, model, Model, Types } from 'mongoose';
import { ISchool } from '../interfaces/edu/school.interface';


export const PeriodSchema = new Schema({
  title: {
    type: String,
    required: true
  }
});

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
  personnel: [
    {
      person: {type: Schema.Types.ObjectId , ref: 'Person'},
      roles: [{type: Schema.Types.ObjectId , ref: 'Role'}]
    }
  ],
  period: [PeriodSchema]
});

export const School: Model<ISchool> = model<ISchool>('School', SchoolSchema);
