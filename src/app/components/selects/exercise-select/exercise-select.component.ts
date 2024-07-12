import {Component, inject, Input, OnInit} from '@angular/core';
import {ExerciseService} from "../../../services/exercise/exercise.service";
import {Exercise} from "../../../interface/dto/exercise";
import {SelectOption} from "../../../interface/components/select/selectOption";
import {SelectComponent} from "../../select/select.component";

@Component({
  selector: 'app-exercise-select',
  standalone: true,
  imports: [
    SelectComponent
  ],
  templateUrl: './exercise-select.component.html',
})
export class ExerciseSelectComponent implements OnInit {

  @Input() value: string | undefined;
  exerciseOptions: SelectOption[] = [];

  private exerciseService: ExerciseService = inject(ExerciseService)

  ngOnInit(): void {
    this.exerciseService.exercises.subscribe((exercises: Exercise[]) => {
      this.exerciseOptions = exercises.map((exercise: Exercise) => {
        return {
          title: exercise.name,
          value: exercise.id,
        };
      });
    })
  }
}
