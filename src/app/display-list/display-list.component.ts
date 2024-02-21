import { Component, OnInit } from '@angular/core';
import { TaskListService } from '../services/task-list.service';
import { Taskmodel } from '../taskmodel';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-display-list',
  templateUrl: './display-list.component.html',
  styleUrl: './display-list.component.scss'
})
export class DisplayListComponent implements OnInit {
  taskList: any = {};

  constructor(private TaskListService: TaskListService) { }
  ngOnInit(): void {
    this.taskList = this.TaskListService.getSavedTasks();
  }

  deleteTask(taskId: number) {
    this.TaskListService.removeTask(taskId);
    this.taskList = this.TaskListService.getSavedTasks();
  }

  finishTask(task: Taskmodel, index: any) {
    task.TaskStatus = "Finished";
    this.TaskListService.updateTask(task, index);
    this.taskList = this.TaskListService.getSavedTasks();
  }
}
