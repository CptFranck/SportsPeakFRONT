import {Component, Input, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-input-control',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './input-control.component.html',
})
export class InputControlComponent implements OnInit {
  @Input() formGroup!: FormGroup
  @Input() fieldName!: string
  @Input() rules!: string
  @Input() errorMessage: string = ""

  constructor() {
  }

  ngOnInit() {
    if (this.errorMessage === "")
      this.errorMessage = "Please write a correct " + this.fieldName + " (" + this.rules + ")."
    else
      this.errorMessage += " (" + this.rules + ")."
  }
}
