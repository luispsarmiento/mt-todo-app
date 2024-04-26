export interface Task{
    id?: any;
    _id?: any;
    name: string;
    schudeledDate?: Date;
    status?: 'pending' | 'scheduled' | 'completed' ;
    completedDate?: Date;
    isSync?: boolean;
}