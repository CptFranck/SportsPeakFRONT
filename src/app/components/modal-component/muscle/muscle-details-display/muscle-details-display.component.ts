import {Component, Input} from '@angular/core';
import {Muscle} from "../../../../interface/dto/muscle";
import {NgForOf, NgIf} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-muscle-details-display',
  imports: [
    NgIf,
    ReactiveFormsModule,
    NgForOf
  ],
  templateUrl: './muscle-details-display.component.html'
})
export class MuscleDetailsDisplayComponent {
  @Input() muscle: Muscle | undefined;
  @Input() action!: string;
}
