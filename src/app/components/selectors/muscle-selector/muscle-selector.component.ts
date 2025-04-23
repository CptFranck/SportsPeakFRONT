import {Component, forwardRef, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {MultiSelectOption} from "../../../interface/components/multi-select/multiSelectOption";
import {MuscleService} from "../../../services/muscle/muscle.service";
import {Muscle} from "../../../interface/dto/muscle";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {MultiSelectComponent} from "../../multi-select/multi-select.component";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-muscle-selector',
  imports: [
    MultiSelectComponent,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MuscleSelectorComponent),
      multi: true,
    }
  ],
  templateUrl: './muscle-selector.component.html'
})
export class MuscleSelectorComponent implements OnInit, OnDestroy, ControlValueAccessor {
  loading = signal<boolean>(true);
  muscleIds = signal<number[]>([]);
  muscleOptions = signal<MultiSelectOption[]>([]);

  private readonly unsubscribe$ = new Subject<void>();
  private readonly muscleService = inject(MuscleService);

  ngOnInit(): void {
    this.muscleService.allMuscle()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((muscles: Muscle[]) => {
        let options: MultiSelectOption[] = []
        muscles.forEach((muscle: Muscle) => {
          options.push({
            id: muscle.id.toString(),
            title: muscle.name,
            value: muscle,
            description: muscle.description
          });
        });
        this.muscleOptions.set([...options]);
      });
    this.muscleService.loading()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((loading: boolean) => this.loading.set(loading));
  }

  onChange: (value: number[]) => void = () => {
  };

  onTouched: () => void = () => {
  };

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  writeValue(muscleIds: number[]): void {
    this.muscleIds.set([...muscleIds]);
  }

  registerOnChange(fn: (value: number[]) => void): void {
    this.onChange = fn
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn
  }

  setExerciseIds(muscleIds: number[]) {
    this.muscleIds.set([...muscleIds]);
    this.onChange(muscleIds);
  }
}
