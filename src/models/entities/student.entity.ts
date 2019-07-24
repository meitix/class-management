import { Schema, model, Model } from 'mongoose';
import { IStudent } from '../interfaces/edu/student.interface';

export const StudentSchema = new Schema<IStudent>({
  info: {
    type: Schema.Types.ObjectId,
    ref: 'Person'
  },
  period: { type: Schema.Types.ObjectId , ref: 'Period'},
  school: {
    index: true,
    type: Schema.Types.ObjectId,
    ref: 'School'
  },
  parent: {
    index: true,
    type: Schema.Types.ObjectId,
    ref: 'Person'
  }
});

export const Student: Model<IStudent> = model<IStudent>('Student' , StudentSchema);