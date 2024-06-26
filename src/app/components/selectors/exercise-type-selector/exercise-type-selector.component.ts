import {Component, forwardRef, inject, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {Option} from "../../../interface/multi-select/option";
import {ExerciseTypeService} from "../../../services/exercise-type/exercise-type.service";
import {ExerciseType} from "../../../interface/dto/exerciseType";
import {MultiSelectComponent} from "../../multi-select/multi-select.component";

@Component({
  selector: 'app-exercise-type-selector',
  standalone: true,
  imports: [
    MultiSelectComponent
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ExerciseTypeSelectorComponent),
      multi: true,
    }
  ],
  templateUrl: './exercise-type-selector.component.html',
})
export class ExerciseTypeSelectorComponent implements OnInit, ControlValueAccessor {
  loading: boolean = true;
  exerciseTypes: Option[] = [];

  @Input() exerciseTypeIds: number[] = [];

  private exerciseTypeService: ExerciseTypeService = inject(ExerciseTypeService);

  onChange: (value: number[]) => void = () => {
  };

  onTouched: ($event: boolean) => void = () => {
  };

  ngOnInit(): void {
    this.exerciseTypeService.exerciseTypes.subscribe((exerciseTypes: ExerciseType[]): void => {
      let options: Option[] = []
      exerciseTypes.forEach((exerciseType: ExerciseType) => {
        options.push({
          id: exerciseType.id,
          title: exerciseType.name,
          value: exerciseType,
          description: exerciseType.goal
        });
      });
      this.exerciseTypes = [...options];
    });
    this.exerciseTypeService.isLoading.subscribe((loading: boolean) => this.loading = loading);
  }

  writeValue(exerciseTypeIds: number[]): void {
    this.exerciseTypeIds = exerciseTypeIds;
  }

  registerOnChange(fn: (value: number[]) => void): void {
    this.onChange = fn
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn
  }

  setExerciseIds(exerciseTypeIds: number[]) {
    this.exerciseTypeIds = exerciseTypeIds;
    this.onChange(exerciseTypeIds);
  }
}
