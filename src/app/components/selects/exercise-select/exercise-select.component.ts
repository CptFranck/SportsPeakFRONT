import {Component, forwardRef, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {ExerciseService} from "../../../services/exercise/exercise.service";
import {Exercise} from "../../../interface/dto/exercise";
import {SelectOption} from "../../../interface/components/select/selectOption";
import {SelectComponent} from "../../select/select.component";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-exercise-select',
  standalone: true,
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
  templateUrl: './exercise-select.component.html',
})
export class ExerciseSelectComponent implements OnInit, OnDestroy, ControlValueAccessor {

  exerciseOptions: SelectOption[] = [];

  @Input() exerciseId: number | undefined;

  private readonly unsubscribe$: Subject<void> = new Subject<void>();
  private readonly exerciseService: ExerciseService = inject(ExerciseService)

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
    this.exerciseId = exerciseId;
  }

  registerOnChange(fn: (value: number | undefined) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setExerciseId(exerciseId: string | undefined) {
    if (exerciseId) {
      let exId: number = parseInt(exerciseId)
      this.exerciseId = exId;
      this.onChange(exId);
    }
  }
}
