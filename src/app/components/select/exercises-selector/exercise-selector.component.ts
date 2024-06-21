import {Component, forwardRef, inject, Input, OnInit} from '@angular/core';
import {MultiSelectComponent} from "../multi-select/multi-select.component";
import {Exercise} from "../../../interface/dto/exercise";
import {Option} from "../../../interface/multi-select/option";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {ExerciseService} from "../../../services/exercise/exercise.service";

@Component({
  selector: 'app-exercise-selector',
  standalone: true,
  imports: [
    MultiSelectComponent,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ExerciseSelectorComponent),
      multi: true,
    }
  ],
  templateUrl: './exercise-selector.component.html',
})
export class ExerciseSelectorComponent implements OnInit, ControlValueAccessor {
  loading: boolean = true;
  exerciseOptions: Option[] = [];

  @Input() exerciseIds: number[] = [];

  private exerciseService: ExerciseService = inject(ExerciseService);

  onChange: (value: number[]) => void = () => {
  };

  onTouched: ($event: boolean) => void = () => {
  };

  ngOnInit(): void {
    this.exerciseService.exercises.subscribe((exercises: Exercise[]) => {
      let options: Option[] = []
      exercises.forEach((exercise: Exercise) => {
        options.push({
          id: exercise.id,
          title: exercise.name,
          value: exercise,
          description: exercise.description
        });
      });
      this.exerciseOptions = [...options];
    });
    this.exerciseService.isLoading.subscribe((loading: boolean) => this.loading = loading);
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
