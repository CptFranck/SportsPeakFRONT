import {Component, forwardRef, inject, Input, OnInit} from '@angular/core';
import {ExerciseService} from "../../../services/exercise/exercise.service";
import {Exercise} from "../../../interface/dto/exercise";
import {SelectOption} from "../../../interface/components/select/selectOption";
import {SelectComponent} from "../../select/select.component";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

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
export class ExerciseSelectComponent implements OnInit, ControlValueAccessor {

  exerciseOptions: SelectOption[] = [];

  @Input() exerciseId: string | undefined;

  private exerciseService: ExerciseService = inject(ExerciseService)

  onChange: (value: string | undefined) => void = () => {
  };

  onTouched: ($event: boolean) => void = () => {
  };

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

  writeValue(exerciseId: string | undefined): void {
    this.exerciseId = exerciseId;
  }

  registerOnChange(fn: (value: string | undefined) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setExerciseId(exerciseId: string | undefined) {
    this.exerciseId = exerciseId;
    this.onChange(exerciseId);
  }
}
