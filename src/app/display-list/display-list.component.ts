import { Component, OnInit } from '@angular/core';
import { TaskListService } from '../services/task-list.service';
import { Taskmodel } from '../taskmodel';
import { FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-display-list',
  templateUrl: './display-list.component.html',
  styleUrl: './display-list.component.scss'
})
export class DisplayListComponent implements OnInit {
  taskList: any = {};
  confirmedTask: any = { TaskId: 0, TaskName: '' };
  constructor(private TaskListService: TaskListService, private modalService: NgbModal) { }
  ngOnInit(): void {
    this.taskList = this.TaskListService.getSavedTasks();
  }

  deleteTask() {
    this.TaskListService.removeTask(this.confirmedTask.TaskId);
    this.taskList = this.TaskListService.getSavedTasks();

  }

  finishTask(task: Taskmodel, index: any) {
    task.TaskStatus = "Finished";
    this.TaskListService.updateTask(task, index);
    this.taskList = this.TaskListService.getSavedTasks();
  }

  public open(modal: any, taskId: number, taskName: string): void {
    this.confirmedTask.TaskId = taskId;
    this.confirmedTask.TaskName = taskName;
    this.modalService.open(modal);
  }

}
