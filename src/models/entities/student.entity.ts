import { Schema, model, Model } from 'mongoose';
import { IStudent } from '../interfaces/edu/student.interface';

export const StatisticSchema = new Schema({
  grade: {
    type: Schema.Types.ObjectId,
    ref: 'Person' // TODO: fix this.
  }, 
  statuses: [
    {
      homework: Boolean,
      present: Boolean,
      description: String,
      date: {
        type: Date,
        default: Date.now()
      }
    }
  ]
});

export const StudentSchema = new Schema<IStudent>({
  info: {
    type: Schema.Types.ObjectId,
    ref: 'Person'
  },
  period: { type: Schema.Types.ObjectId , ref: 'Period'},
  school: {
    type: Schema.Types.ObjectId,
    ref: 'School'
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: 'Person'
  },
  statistics: [StatisticSchema]
});

export const Student: Model<IStudent> = model<IStudent>('Student' , StudentSchema);