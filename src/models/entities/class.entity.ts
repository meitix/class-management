import { Schema, Model, model } from "mongoose";
import { IClass } from "../interfaces/edu/class.interface";


export const ClassSchema = new Schema({
    title: String,
    grade: {type: Schema.Types.ObjectId , ref: 'Grade'},
    students: [{type: Schema.Types.ObjectId , ref: 'Student'}],
    teacher: {type: Schema.Types.ObjectId , ref: 'Person'},
    description: String,
    isActive: Boolean,
    period: String
});

export const Class: Model<IClass> = model<IClass>('Class', ClassSchema);