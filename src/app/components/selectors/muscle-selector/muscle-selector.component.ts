import {Component, forwardRef, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {MultiSelectOption} from "../../../interface/components/multi-select/multiSelectOption";
import {MuscleService} from "../../../services/muscle/muscle.service";
import {Muscle} from "../../../interface/dto/muscle";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {MultiSelectComponent} from "../../multi-select/multi-select.component";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-muscle-selector',
  standalone: true,
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
  templateUrl: './muscle-selector.component.html',
})
export class MuscleSelectorComponent implements OnInit, OnDestroy, ControlValueAccessor {
  loading: boolean = true;
  muscleOptions: MultiSelectOption[] = [];

  @Input() muscleIds: number[] = [];

  private readonly unsubscribe$: Subject<void> = new Subject<void>();
  private readonly muscleService: MuscleService = inject(MuscleService);

  onChange: (value: number[]) => void = () => {
  };

  onTouched: ($event: boolean) => void = () => {
  };

  ngOnInit(): void {
    this.muscleService.muscles
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
        this.muscleOptions = [...options];
      });
    this.muscleService.isLoading
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((loading: boolean) => this.loading = loading);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  writeValue(muscleIds: number[]): void {
    this.muscleIds = muscleIds;
  }

  registerOnChange(fn: (value: number[]) => void): void {
    this.onChange = fn
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn
  }

  setExerciseIds(muscleIds: number[]) {
    this.muscleIds = muscleIds;
    this.onChange(muscleIds);
  }
}
