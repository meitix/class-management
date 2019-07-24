import { Schema, Types, Model, model } from 'mongoose';
import { IClassStatus } from '../interfaces/edu/statistics.interface';

const StudentStatusSchema = new Schema({
  student: {
    index: true,
    type: Types.ObjectId,
    ref: 'Student',
    required: [true, 'دانش آموز دریافت نشده است']
  },
  result: {
    type: { present: Boolean, homework: Boolean, lesson: Boolean }
  },
  description: String,
});

export const ClassStatusSchema = new Schema({
  class: {
    index: true,
    type: Types.ObjectId,
    ref: 'Class',
    required: [true, 'کلاس دریافت نشده است']
  },
  Statistics: [StudentStatusSchema],
  date: { type: Date, required: [true] , index: true}
});

export const ClassStatus: Model<IClassStatus> = model('ClassGrade', ClassStatusSchema);
