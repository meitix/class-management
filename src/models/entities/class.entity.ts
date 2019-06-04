import { Schema, Model, model } from "mongoose";
import { IClass } from "../interfaces/edu/class.interface";


export const ClassSchema = new Schema({
    title: String,
    grade: {type: Schema.Types.ObjectId , ref: 'Grade'},
    students: [{type: Schema.Types.ObjectId , ref: 'People'}],
    teacher: {type: Schema.Types.ObjectId , ref: 'People'},
    description: String
});

export const Class: Model<IClass> = model<IClass>('Class', ClassSchema);