import {Component, forwardRef, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {MultiSelectOption} from "../../../shared/model/component/multi-select/multiSelectOption";
import {ExerciseTypeService} from "../../../core/services/exercise-type/exercise-type.service";
import {ExerciseType} from "../../../shared/model/dto/exercise-type";
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
  loading = signal<boolean>(true);
  exerciseTypeIds = signal<number[]>([]);
  exerciseTypesOptions = signal<MultiSelectOption[]>([]);

  private readonly unsubscribe$ = new Subject<void>();
  private readonly exerciseTypeService = inject(ExerciseTypeService);

  ngOnInit(): void {
    this.exerciseTypeService.isLoading$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((loading: boolean) => this.loading.set(loading));
    this.exerciseTypeService.exerciseTypeList$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((exerciseTypes: ExerciseType[]): void => {
        let options: MultiSelectOption[] = []
        exerciseTypes.forEach((exerciseType: ExerciseType) => {
          options.push({
            id: exerciseType.id,
            title: exerciseType.name,
            value: exerciseType,
            description: exerciseType.goal
          });
        });
        this.exerciseTypesOptions.set([...options]);
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

  writeValue(exerciseTypeIds: number[]): void {
    this.exerciseTypeIds.set([...exerciseTypeIds]);
  }

  registerOnChange(fn: (value: number[]) => void): void {
    this.onChange = fn
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn
  }

  setExerciseIds(exerciseTypeIds: number[]) {
    this.exerciseTypeIds.set([...exerciseTypeIds])
    this.onChange(exerciseTypeIds);
  }
}
