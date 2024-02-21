import { FormControl } from "@angular/forms";

export interface Taskmodel {
    TaskId: number;
    TaskName: string;
    TaskDescription: string;
    TaskDueDate: Date;
    TaskStatus: string;
    TaskPriority: string;
}

