import {Component, forwardRef, inject, Input, OnInit} from '@angular/core';
import {MultiSelectComponent} from "../multi-select/multi-select.component";
import {Exercise} from "../../../interface/dto/exercise";
import {Option} from "../../../interface/multi-select/option";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {ExerciseService} from "../../../services/exercise/exercise.service";

@Component({
  selector: 'app-select-exercises',
  standalone: true,
  imports: [
    MultiSelectComponent,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectExercisesComponent),
      multi: true,
    }
  ],
  templateUrl: './select-exercises.component.html',
})
export class SelectExercisesComponent implements OnInit, ControlValueAccessor {
  error: any;
  exercises: Option[] = [];
  @Input() exerciseIds: number[] = [];
  exerciseService: ExerciseService = inject(ExerciseService);

  onChange: (value: number[]) => void = () => {
  };

  onTouched: ($event: boolean) => void = () => {
  };

  ngOnInit(): void {
    this.exerciseService.getExercises().subscribe(({data, error}: any) => {
      let options: Option[] = []
      data.getExercises.forEach((exercise: Exercise) => {
        options.push({id: exercise.id, title: exercise.name, value: exercise, description: exercise.description});
      });
      this.exercises = [...options];
      this.error = error;
    });
  }

  writeValue(exerciseIds: number[]): void {
    this.exerciseIds = exerciseIds;
  }

  registerOnChange(fn: (value: number[]) => void): void {
    this.onChange = fn
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn
  }

  setExerciseIds(exerciseIds: number[]) {
    this.exerciseIds = exerciseIds;
    this.onChange(exerciseIds);
  }
}
