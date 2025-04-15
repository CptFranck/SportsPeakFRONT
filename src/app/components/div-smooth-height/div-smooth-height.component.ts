import {Component, ElementRef, HostBinding, input, OnChanges} from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-div-smooth-height',
  template: `
    <ng-content></ng-content>`,
  styles: [`
    :host {
      display: block;
      overflow: hidden;
    }
  `],
  animations: [
    trigger('grow', [
      transition('* <=> *', [
        style({height: '{{height}}px'}),
        animate('500ms ease')
      ], {params: {height: 0}})
    ])
  ]
})
export class DivSmoothHeightComponent implements OnChanges {
  trigger = input<any>();

  height: number = 0;

  constructor(private element: ElementRef) {
  }

  @HostBinding('@grow') get grow() {
    return {
      value: this.trigger(),
      params: {height: this.height}
    };
  }

  ngOnChanges() {
    this.height = this.element.nativeElement.clientHeight;
  }
}
