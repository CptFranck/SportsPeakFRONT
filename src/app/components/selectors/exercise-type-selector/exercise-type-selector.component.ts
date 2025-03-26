import {Component, forwardRef, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {MultiSelectOption} from "../../../interface/components/multi-select/multiSelectOption";
import {ExerciseTypeService} from "../../../services/exercise-type/exercise-type.service";
import {ExerciseType} from "../../../interface/dto/exercise-type";
import {MultiSelectComponent} from "../../multi-select/multi-select.component";
import {Subject, takeUntil} from "rxjs";

@Component({
    selector: 'app-exercise-type-selector',
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
    templateUrl: './exercise-type-selector.component.html'
})
export class ExerciseTypeSelectorComponent implements OnInit, OnDestroy, ControlValueAccessor {
  loading: boolean = true;
  exerciseTypes: MultiSelectOption[] = [];

  @Input() exerciseTypeIds: number[] = [];

  private readonly unsubscribe$: Subject<void> = new Subject<void>();
  private readonly exerciseTypeService: ExerciseTypeService = inject(ExerciseTypeService);

  onChange: (value: number[]) => void = () => {
  };

  onTouched: ($event: boolean) => void = () => {
  };

  ngOnInit(): void {
    this.exerciseTypeService.exerciseTypes
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((exerciseTypes: ExerciseType[]): void => {
        let options: MultiSelectOption[] = []
        exerciseTypes.forEach((exerciseType: ExerciseType) => {
          options.push({
            id: exerciseType.id.toString(),
            title: exerciseType.name,
            value: exerciseType,
            description: exerciseType.goal
          });
        });
        this.exerciseTypes = [...options];
      });
    this.exerciseTypeService.isLoading
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((loading: boolean) => this.loading = loading);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
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
