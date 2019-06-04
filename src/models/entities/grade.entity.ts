import { Schema, Model, model } from "mongoose";
import { IGrade } from '../interfaces/edu/grade.interface';

// Lesson schema.
export const LessonSchema = new Schema({
    title: String,
    description: String
});


export const GradeSchema = new Schema({
    title: String,
    lessons: [LessonSchema],
    description: String
});

export const Grade: Model<IGrade> = model<IGrade>('Grade' , GradeSchema);