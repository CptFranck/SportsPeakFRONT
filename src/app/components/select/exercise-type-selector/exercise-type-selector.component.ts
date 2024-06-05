import {Component, forwardRef, inject, Input, OnInit} from '@angular/core';
import {MultiSelectComponent} from "../multi-select/multi-select.component";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {Option} from "../../../interface/multi-select/option";
import {ExerciseTypeService} from "../../../services/exercise-type/exercise-type.service";
import {ExerciseType} from "../../../interface/dto/exerciseType";

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
  error: any;
  exerciseTypes: Option[] = [];
  @Input() exerciseTypeIds: number[] = [];
  exerciseTypeService: ExerciseTypeService = inject(ExerciseTypeService);

  onChange: (value: number[]) => void = () => {
  };

  onTouched: ($event: boolean) => void = () => {
  };

  ngOnInit(): void {
    this.exerciseTypeService.getExerciseTypes().subscribe(({data, error}: any) => {
      let options: Option[] = []
      data.getExerciseTypes.forEach((exerciseType: ExerciseType) => {
        options.push({
          id: exerciseType.id,
          title: exerciseType.name,
          value: exerciseType,
          description: exerciseType.goal
        });
      });
      this.exerciseTypes = [...options];
      this.error = error;
    });
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
