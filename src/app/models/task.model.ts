export interface Task{
    id?: any;
    _id?: any;
    name: string;
    schudeledDate?: Date;
    status?: string;
    completedDate?: Date;
    isSync?: boolean;
}