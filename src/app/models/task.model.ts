export interface Task{
    id?: any;
    _id?: any;
    name: string;
    priority: number;
    schudeledDate?: string;
    status?: 'pending' | 'scheduled' | 'completed' ;
    completedDate?: string;
    isSync?: boolean;
    isDeleted?: boolean;
    notes?: string;
}