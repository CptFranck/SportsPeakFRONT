import {Component, Input} from '@angular/core';
import {TargetSet} from "../../../../../interface/dto/target-set";
import {NgIf} from "@angular/common";
import {
  TargetSetSateSelectComponent
} from "../../../../../components/selects/target-set-state-select/target-set-sate-select.component";

@Component({
  selector: 'app-target-set-state-form',
  standalone: true,
  imports: [
    NgIf,
    TargetSetSateSelectComponent
  ],
  templateUrl: './target-set-state-form.component.html',
})
export class TargetSetStateFormComponent {
  modify: boolean = false;

  @Input() targetSet!: TargetSet;

  onClick(): void {
    this.modify = !this.modify;
  }

}
