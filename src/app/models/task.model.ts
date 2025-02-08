export interface Task{
    id?: any;
    _id?: any;
    name: string;
    priority: number;
    scheduledDate?: string | null;
    status?: 'pending' | 'scheduled' | 'completed' ;
    completedDate?: string | null;
    isSync?: boolean;
    isDeleted?: boolean;
    notes?: string;
    createAt?: string | null;
    subTasks?: SubTask[];
    startDate?: string | null;
    breakDate?: string | null;
    isTimerRunning?: boolean;
    focusTimer?: number;
}

export interface SubTask{
    name: string;
    status?: 'pending' | 'scheduled' | 'completed' ;
}