import { Schema, Model, model, Types, } from "mongoose";
import * as mongoose from 'mongoose';
import { IClass } from "../interfaces/edu/class.interface";
const deepPopulate = require('mongoose-deep-populate')(mongoose);

// const deepPopulate = DeepPopulate.default(mongoose);

export const ClassSchema = new Schema({
    title: String,
    grade: {type: Schema.Types.ObjectId , ref: 'Grade'},
    students: [{type: Schema.Types.ObjectId , ref: 'Student'}],
    teacher: {type: Schema.Types.ObjectId , ref: 'Person'},
    description: String,
    price: Number,
    isActive: Boolean,
    school: { type: Types.ObjectId, ref: 'School'},
    period: {
        type: Types.ObjectId , ref: 'Period'
    }
});

ClassSchema.plugin(deepPopulate, {});

export const Class: Model<IClass> = model<IClass>('Class', ClassSchema);