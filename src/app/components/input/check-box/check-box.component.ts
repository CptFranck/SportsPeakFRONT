import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-check-box',
  standalone: true,
  imports: [],
  templateUrl: './check-box.component.html',
})
export class CheckBoxComponent {

  @Input() label !: string;
  @Input() checked !: boolean;

  @Output() actionPerformanceLog: EventEmitter<void> = new EventEmitter();

  onCheckBoxClick() {
    this.actionPerformanceLog.emit()
  }
}
