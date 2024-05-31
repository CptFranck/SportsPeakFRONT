import {Component, Input} from '@angular/core';
import {Muscle} from "../../../interface/dto/muscle";
import {InputControlComponent} from "../../../components/input-control/input-control.component";
import {NgForOf, NgIf} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {SelectExercisesComponent} from "../../../components/select/select-exercises/select-exercises.component";

@Component({
  selector: 'app-muscle-details',
  standalone: true,
  imports: [
    InputControlComponent,
    NgIf,
    ReactiveFormsModule,
    SelectExercisesComponent,
    NgForOf
  ],
  templateUrl: './muscle-details.component.html',
})
export class MuscleDetailsComponent {
  muscle: Muscle | undefined;

  @Input() set muscleInput(value: Muscle | undefined) {
    this.muscle = value;
  }
}
