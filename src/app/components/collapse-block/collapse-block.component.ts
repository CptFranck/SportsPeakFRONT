import {Component, Input} from '@angular/core';
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-collapse-block',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './collapse-block.component.html',
})
export class CollapseBlockComponent {

  @Input() collapseId!: string;
  @Input() classArgs: string = "";
}
