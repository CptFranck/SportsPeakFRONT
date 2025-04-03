import {Component, ElementRef, EventEmitter, input, OnInit, Output, signal} from '@angular/core';
import {CollapseBlockComponent} from "../collapse-block/collapse-block.component";

@Component({
  selector: 'app-collapse-button',
  templateUrl: './collapse-button.component.html'
})
export class CollapseButtonComponent implements OnInit {
  AllWidthStyle = signal<string>("");

  readonly value = input.required<any>();
  readonly allWidth = input<boolean>(false);
  readonly btnClass = input.required<string>();
  readonly onlyClose = input<boolean>(false);
  readonly collapseId = input.required<string>();
  readonly collapseBlockComponent = input<CollapseBlockComponent>();

  @Output() onClickEvent: EventEmitter<any> = new EventEmitter();

  constructor(private readonly elementRef: ElementRef) {
  }

  ngOnInit(): void {
    if (this.allWidth())
      this.AllWidthStyle.set("width:100%");
  }

  onClick() {
    this.onClickEvent.emit(this.value());
    const collapseBlockComponent = this.collapseBlockComponent();
    if (collapseBlockComponent) {
      collapseBlockComponent.toggle(this.elementRef)
    }
  }
}
