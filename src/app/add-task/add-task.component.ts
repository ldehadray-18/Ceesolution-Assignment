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


  setPriorityDropDown(value: string) {
    this.priorityDropdownbutton.nativeElement.innerText = value;
    //  document.getElementById("priorityDropdownMenu").innerText = value;
    this.priorityDropdown.setValue(value);
  }

  setStatusDropDown(value: string) {
    this.statusDropdownbutton.nativeElement.innerText = value;
    //  document.getElementById("priorityDropdownMenu").innerText = value;
    this.statusDropdown.setValue(value);
  }

  constructor(config: NgbInputDatepickerConfig, private calendar: NgbCalendar, private fb: FormBuilder, private TaskListervice: TaskListService) {
    this.minDate = this.calendar.getToday();

    // days that don't belong to current month are not visible
    config.outsideDays = 'hidden';

    // setting datepicker popup to close only on click outside
    config.autoClose = 'outside';

    // setting datepicker popup to open above the input
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
      alert("Task Add Successfully");
      this.submitted = false;
      this.ToDoForm.reset();
    }

  }



  private dateToString = (date: any) => `${date.year}/${date.month}/${date.day}`;

}
