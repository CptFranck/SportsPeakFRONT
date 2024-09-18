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

  @Input() collapseBlockComponent?: CollapseBlockComponent;

  onClick() {
    if (this.value && this.onClickEvent) {
      this.onClickEvent.emit(this.value);
    }
    if (this.collapseBlockComponent) {
      this.collapseBlockComponent.scroll()
      if (this.onlyOpen)
        this.collapseBlockComponent.show();
      else if (this.onlyClose)
        this.collapseBlockComponent.hide()
      else
        this.collapseBlockComponent.toggle()
    }
  }
}
