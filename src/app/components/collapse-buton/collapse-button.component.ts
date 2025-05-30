import {Component, ElementRef, input, OnInit, output, signal, viewChild} from '@angular/core';
import {CollapseBlockComponent} from "../collapse-block/collapse-block.component";
import {TargetSet} from "../../interface/dto/target-set";

@Component({
  selector: 'app-collapse-button',
  templateUrl: './collapse-button.component.html'
})
export class CollapseButtonComponent implements OnInit {
  style = signal<string>("");

  readonly value = input.required<any>();
  readonly allWidth = input<boolean>(false);
  readonly btnClass = input.required<string>();
  readonly onlyClose = input<boolean>(false);
  readonly onOneLine = input<boolean>(false);
  readonly collapseId = input.required<string>();
  readonly collapseBlockComponent = input<CollapseBlockComponent>();

  readonly onClickEvent = output<TargetSet>();

  readonly elementRef = viewChild.required<ElementRef>('collapseButton');

  ngOnInit(): void {
    if (this.allWidth())
      this.style.update(value => value + " width:100%;")
    if (this.onOneLine())
      this.style.update(value => value + " white-space: nowrap; text-align: center;")
  }

  onClick() {
    this.onClickEvent.emit(this.value());
    const collapseBlockComponent = this.collapseBlockComponent();
    if (collapseBlockComponent)
      collapseBlockComponent.toggle(this.elementRef())
  }
}
