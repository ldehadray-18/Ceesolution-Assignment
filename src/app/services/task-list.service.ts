import { Injectable } from '@angular/core';
import { Taskmodel } from '../taskmodel';
import { DropdownArray } from '../dropdown-array';

@Injectable({
  providedIn: 'root'
})
export class TaskListService {
  private readonly localStorageKey = 'TaskList';

  saveTask(task: Taskmodel): void {
    task.TaskId = this.generateId();
    const savedTasks = this.getSavedTasks();
    savedTasks.push(task);
    this.updateLocalStorage(savedTasks);
  }

  removeTask(TaskId: number): void {
    const savedTasks = this.getSavedTasks().filter((Task: Taskmodel) => Task.TaskId !== TaskId);
    this.updateLocalStorage(savedTasks);
  }

  updateTask(task: Taskmodel, index: any): void {
    let savedTasks = this.getSavedTasks();
    savedTasks[index] = task;
    this.updateLocalStorage(savedTasks);
  }

  getSavedTasks(): any[] {
    const savedTasks = localStorage.getItem(this.localStorageKey);
    return savedTasks ? JSON.parse(savedTasks) : [];
  }

  private updateLocalStorage(savedTasks: any[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(savedTasks));
  }

  generateId(): number {
    const items = this.getSavedTasks() || [];
    const lastItem = items[items.length - 1];
    const lastId = lastItem ? lastItem.TaskId : 0;
    return lastId + 1;
  }
}
