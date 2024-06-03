import {Component, Input} from '@angular/core';
import {Muscle} from "../../../../interface/dto/muscle";
import {InputControlComponent} from "../../../../components/input-control/input-control.component";
import {NgForOf, NgIf} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {SelectExercisesComponent} from "../../../../components/select/select-exercises/select-exercises.component";

@Component({
  selector: 'app-muscle-details-display',
  standalone: true,
  imports: [
    InputControlComponent,
    NgIf,
    ReactiveFormsModule,
    SelectExercisesComponent,
    NgForOf
  ],
  templateUrl: './muscle-details-display.component.html',
})
export class MuscleDetailsDisplayComponent {
  muscle: Muscle | undefined;
  @Input() action!: string;

  @Input() set muscleInput(value: Muscle | undefined) {
    this.muscle = value;
  }
}
