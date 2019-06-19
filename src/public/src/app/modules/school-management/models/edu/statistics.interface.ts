import { IGrade } from "./grade.interface";

export interface IStatus {
    homework: boolean;
    present: boolean;
    description?: string;
    date: Date;
}

export interface IStatistic {
    grade: IGrade;
    statuses: Array<IStatus>;
}

export type IStatistics = Array<IStatistic>;
