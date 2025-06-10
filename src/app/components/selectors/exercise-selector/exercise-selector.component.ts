import {Component, forwardRef, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {Exercise} from "../../../shared/model/dto/exercise";
import {MultiSelectOption} from "../../../shared/model/component/multi-select/multiSelectOption";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {ExerciseService} from "../../../core/services/exercise/exercise.service";
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
  loading = signal<boolean>(true);
  exerciseIds = signal<number[]>([]);
  exerciseOptions = signal<MultiSelectOption[]>([]);

  private readonly unsubscribe$ = new Subject<void>();
  private readonly exerciseService = inject(ExerciseService);

  ngOnInit(): void {
    this.exerciseService.isLoading$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((loading: boolean) => this.loading.set(loading));
    this.exerciseService.exerciseList$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((exercises: Exercise[]) => {
        let options: MultiSelectOption[] = []
        exercises.forEach((exercise: Exercise) => {
          options.push({
            id: exercise.id,
            title: exercise.name,
            value: exercise,
            description: exercise.description
          });
        });
        this.exerciseOptions.set([...options]);
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onChange: (value: number[]) => void = () => {
  };

  onTouched: () => void = () => {
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
