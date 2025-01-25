export interface Task{
    id?: any;
    _id?: any;
    name: string;
    priority: number;
    scheduledDate?: string | null;
    status?: 'pending' | 'scheduled' | 'completed' ;
    completedDate?: string;
    isSync?: boolean;
    isDeleted?: boolean;
    notes?: string;
    createAt?: string | null;
    subTasks?: SubTask[];
}

export interface SubTask{
    name: string;
    status?: 'pending' | 'scheduled' | 'completed' ;
}