import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  NgbModule,
  NgbCalendar,
  NgbDate,
  NgbDatepickerModule,
  NgbDateStruct,
  NgbInputDatepickerConfig,
} from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TaskListService } from '../services/task-list.service';
import { Taskmodel } from '../taskmodel';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})

export class AddTaskComponent implements OnInit {
  @ViewChild('priorityDropdownMenu') priorityDropdownbutton: ElementRef | any;
  @ViewChild('statusDropdownMenu') statusDropdownbutton: ElementRef | any;
  minDate: NgbDateStruct | any;
  ToDoForm: FormGroup | any;
  task: Taskmodel | any;
  priorityDropdown: FormControl | any;
  statusDropdown: FormControl | any;
  submitted = false;
  AlertSuccessFail: boolean = false;

  setPriorityDropDown(value: string) {
    this.priorityDropdownbutton.nativeElement.innerText = value;
    this.priorityDropdown.setValue(value);
  }

  setStatusDropDown(value: string) {
    this.statusDropdownbutton.nativeElement.innerText = value;
    this.statusDropdown.setValue(value);
  }

  constructor(config: NgbInputDatepickerConfig, private calendar: NgbCalendar, private fb: FormBuilder, private TaskListervice: TaskListService) {
    this.minDate = this.calendar.getToday();
    config.outsideDays = 'hidden';
    config.autoClose = 'outside';
    config.placement = ['bottom-end', 'bottom-start'];
    this.priorityDropdown = new FormControl('');
    this.statusDropdown = new FormControl('');
  }
  ngOnInit(): void {
    this.ToDoForm = this.fb.group({
      TaskName: ["", [Validators.required, Validators.minLength(3)]],
      TaskDescription: [""],
      TaskDueDate: ["", [Validators.min(this.minDate)]],
      TaskStatus: this.statusDropdown,
      TaskPriority: this.priorityDropdown
    })
  }

  submit() {
    this.submitted = true;
    if (this.ToDoForm.valid) {
      this.task = this.ToDoForm.value;
      this.task.TaskDueDate = this.dateToString(this.task.TaskDueDate);
      this.TaskListervice.saveTask(this.task);
      this.AlertSuccessFail = true;
      this.submitted = false;
      setTimeout(() => { this.AlertSuccessFail = false; }, 4000);
      this.ToDoForm.reset();
    }
  }

  private dateToString = (date: any) => `${date.year}/${date.month}/${date.day}`;

}
