import {Component, forwardRef, inject, model, OnDestroy, OnInit} from '@angular/core';
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

  exerciseOptions: SelectOption[] = [];

  exerciseId = model<number>();

  private readonly unsubscribe$ = new Subject<void>();
  private readonly exerciseService = inject(ExerciseService)

  onChange: (value: number | undefined) => void = () => {
  };

  onTouched: ($event: boolean) => void = () => {
  };

  ngOnInit(): void {
    this.exerciseService.exercises
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((exercises: Exercise[]) => {
        this.exerciseOptions = exercises.map((exercise: Exercise) => {
          return {
            title: exercise.name,
            value: exercise.id.toString(),
          };
        });
      })
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  writeValue(exerciseId: number | undefined): void {
    this.exerciseId.set(exerciseId);
  }

  registerOnChange(fn: (value: number | undefined) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setExerciseId(exerciseId: string | undefined) {
    let exId: number | undefined;
    if (exerciseId) exId = parseInt(exerciseId)
    this.exerciseId.set(exId);
    this.onChange(exId);
  }
}
