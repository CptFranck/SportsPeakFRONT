import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-check-box',
  standalone: true,
  imports: [],
  templateUrl: './check-box.component.html',
})
export class CheckBoxComponent {

  label!: string;
  checked !: boolean
  @Input() labelCheck !: string;
  @Input() labelUnchecked !: string;

  @Output() actionPerformanceLog: EventEmitter<void> = new EventEmitter();

  @Input() set checkedInput(checked: boolean) {
    this.checked = checked;
    this.updateLabel();
  }

  onCheckBoxClick() {
    this.actionPerformanceLog.emit();
  }

  updateLabel() {
    if (this.checked)
      this.label = this.labelCheck;
    else
      this.label = this.labelUnchecked;
  }
}
