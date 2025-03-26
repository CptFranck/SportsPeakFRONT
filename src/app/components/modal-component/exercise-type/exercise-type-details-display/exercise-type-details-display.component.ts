import {Component, Input} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {ExerciseType} from "../../../../interface/dto/exercise-type";

@Component({
    selector: 'app-exercise-type-details-display',
    imports: [
        NgForOf,
        NgIf
    ],
    templateUrl: './exercise-type-details-display.component.html'
})
export class ExerciseTypeDetailsDisplayComponent {
  @Input() exerciseType: ExerciseType | undefined;
  @Input() action!: string;
}
