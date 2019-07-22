import { Schema, Types, Model, model } from 'mongoose';
import { IStudentStatus } from '../interfaces/edu/statistics.interface';

export const IStudentStatusSchema = new Schema({
  student: {
    type: Types.ObjectId,
    ref: 'Student',
    required: [true, 'دانش آموز دریافت نشده است']
  },
  class: {
    type: Types.ObjectId,
    ref: 'Class',
    required: [true, 'کلاس دریافت نشده است']
  },
  result: {
    type: { present: Boolean, homework: Boolean, lesson: Boolean }
  },
  description: String,
  date: { type: Date, required: [true] }
});

export const StudentStatus: Model<IStudentStatus> = model('StudentGrade',IStudentStatusSchema);
