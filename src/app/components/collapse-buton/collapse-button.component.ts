import {Component, ElementRef, EventEmitter, Input, Output} from '@angular/core';
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
  @Input() collapseBlockComponent?: CollapseBlockComponent;

  @Output() onClickEvent: EventEmitter<any> = new EventEmitter();

  constructor(private elementRef: ElementRef) {
  }

  onClick() {
    if (this.value && this.onClickEvent) {
      this.onClickEvent.emit(this.value);
    }
    if (this.collapseBlockComponent) {
      this.collapseBlockComponent.toggle(this.elementRef)
    }
  }
}
