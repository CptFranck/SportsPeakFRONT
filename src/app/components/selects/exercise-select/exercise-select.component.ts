import {Component, forwardRef, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {ExerciseService} from "../../../services/exercise/exercise.service";
import {Exercise} from "../../../interface/dto/exercise";
import {SelectOption} from "../../../interface/components/select/selectOption";
import {SelectComponent} from "../../select/select.component";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-exercise-select',
  imports: [
    SelectComponent
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ExerciseSelectComponent),
      multi: true,
    }
  ],
  templateUrl: './exercise-select.component.html'
})
export class ExerciseSelectComponent implements OnInit, OnDestroy, ControlValueAccessor {

  exerciseOptions = signal<SelectOption[]>([]);

  exerciseId = signal<string | null>(null);

  private readonly unsubscribe$ = new Subject<void>();
  private readonly exerciseService = inject(ExerciseService)

  ngOnInit(): void {
    this.exerciseService.exercises
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((exercises: Exercise[]) => {
        this.exerciseOptions.set(exercises.map((exercise: Exercise) => {
          return {
            title: exercise.name,
            value: exercise.id.toString(),
          };
        }))
      })
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onChange: (value: number | null) => void = () => {
  };

  onTouched: () => void = () => {
  };

  writeValue(exerciseId: number | null): void {
    if (exerciseId !== null)
      this.exerciseId.set(exerciseId.toString())
    else
      this.exerciseId.set(exerciseId);
  }

  registerOnChange(fn: (value: number | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setExerciseId(exerciseId: string | null) {
    this.exerciseId.set(exerciseId);
    if (exerciseId !== null)
      this.onChange(parseInt(exerciseId))
    else
      this.onChange(exerciseId)
  }
}
