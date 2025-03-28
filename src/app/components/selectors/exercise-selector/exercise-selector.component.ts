import {Component, forwardRef, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {Exercise} from "../../../interface/dto/exercise";
import {MultiSelectOption} from "../../../interface/components/multi-select/multiSelectOption";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {ExerciseService} from "../../../services/exercise/exercise.service";
import {MultiSelectComponent} from "../../multi-select/multi-select.component";
import {Subject, takeUntil} from "rxjs";

@Component({
    selector: 'app-exercise-selector',
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
    templateUrl: './exercise-selector.component.html'
})
export class ExerciseSelectorComponent implements OnInit, OnDestroy, ControlValueAccessor {
  loading: boolean = true;
  exerciseOptions: MultiSelectOption[] = [];

  @Input() exerciseIds: number[] = [];

  private readonly unsubscribe$: Subject<void> = new Subject<void>();
  private readonly exerciseService: ExerciseService = inject(ExerciseService);

  onChange: (value: number[]) => void = () => {
  };

  onTouched: ($event: boolean) => void = () => {
  };

  ngOnInit(): void {
    this.exerciseService.exercises
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((exercises: Exercise[]) => {
        let options: MultiSelectOption[] = []
        exercises.forEach((exercise: Exercise) => {
          options.push({
            id: exercise.id.toString(),
            title: exercise.name,
            value: exercise,
            description: exercise.description
          });
        });
        this.exerciseOptions = [...options];
      });
    this.exerciseService.isLoading
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((loading: boolean) => this.loading = loading);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
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
