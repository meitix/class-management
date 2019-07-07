import { Schema, model, Model, Types } from 'mongoose';
import { ISchool } from '../interfaces/edu/school.interface';
import { IPeriod } from '../interfaces/edu/period.interface';


export const PeriodSchema = new Schema({
  school: {
    type: Schema.Types.ObjectId, ref: 'School'
  },
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
  periods: [PeriodSchema]
});

export const School: Model<ISchool> = model<ISchool>('School', SchoolSchema);
export const Period: Model<IPeriod> = model<IPeriod>('Period' , PeriodSchema);