import { Schema, Model, model } from 'mongoose';
import { IAdmin } from '../interfaces/system/admin.interface';

export const AdminSchema = new Schema({
    title: String,
    level: Number,
    accessibility: [String]
});

export const Admin: Model<IAdmin> = model<IAdmin>('Admin', AdminSchema);
