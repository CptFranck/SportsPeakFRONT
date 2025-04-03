import {Component, forwardRef, inject, OnDestroy, OnInit, signal} from '@angular/core';
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
  loading = true;
  exerciseOptions: MultiSelectOption[] = [];

  readonly exerciseIds = signal<number[]>([]);

  private readonly unsubscribe$ = new Subject<void>();
  private readonly exerciseService = inject(ExerciseService);

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

  onChange: (value: number[]) => void = () => {
  };

  onTouched: (value: boolean) => void = () => {
  };

  writeValue(exerciseIds: number[]): void {
    this.exerciseIds.set([...exerciseIds]);
  }

  registerOnChange(fn: (value: number[]) => void): void {
    this.onChange = fn
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn
  }

  setExerciseIds(exerciseIds: number[]) {
    this.exerciseIds.set([...exerciseIds]);
    this.onChange(exerciseIds);
  }
}
