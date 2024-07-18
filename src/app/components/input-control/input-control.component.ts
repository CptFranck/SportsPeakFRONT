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
  @Input() formGroup!: FormGroup;
  @Input() formGroupFieldName!: string;
  @Input() displayedFieldName: string | undefined;
  @Input() rules: string | undefined;
  @Input() errorMessage: string | undefined;
  @Input() submitInvalid!: boolean;
  @Input() ifInvalid: boolean = false;

  ngOnInit() {
    let fieldName: string;
    if (this.displayedFieldName !== undefined)
      fieldName = this.displayedFieldName;
    else
      fieldName = this.formGroupFieldName

    if (this.rules !== undefined)
      this.rules = " (" + this.rules + ")"
    else
      this.rules = "";

    if (this.errorMessage === undefined)
      this.errorMessage = "Please write a correct " + fieldName + this.rules;
    else
      this.errorMessage += this.rules;
  }
}
