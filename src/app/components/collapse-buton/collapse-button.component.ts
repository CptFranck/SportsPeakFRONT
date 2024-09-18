import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CollapseBlockComponent} from "../collapse-block/collapse-block.component";

@Component({
  selector: 'app-collapse-button',
  standalone: true,
  imports: [],
  templateUrl: './collapse-button.component.html',
})
export class CollapseButtonComponent {
  @Input() value!: any;
  @Input() btnClass!: string;
  @Input() collapseId!: string;
  @Input() onlyOpen: boolean = false
  @Input() onlyClose: boolean = false

  @Output() onClickEvent: EventEmitter<any> = new EventEmitter();

  @Input() collapseBlockRef?: CollapseBlockComponent;

  onClick() {
    if (this.value && this.onClickEvent) {
      this.onClickEvent.emit(this.value);
    }
    if (this.collapseBlockRef) {
      if (this.onlyOpen)
        this.collapseBlockRef.show();
      else if (this.onlyClose)
        this.collapseBlockRef.hide()
      else
        this.collapseBlockRef.toggle()
    }
  }
}
