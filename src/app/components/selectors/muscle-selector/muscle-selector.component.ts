import {Component, forwardRef, inject, Input, OnInit} from '@angular/core';
import {MultiSelectOption} from "../../../interface/multi-select/multiSelectOption";
import {MuscleService} from "../../../services/muscle/muscle.service";
import {Muscle} from "../../../interface/dto/muscle";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {MultiSelectComponent} from "../../multi-select/multi-select.component";

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
export class MuscleSelectorComponent implements OnInit, ControlValueAccessor {
  loading: boolean = true;
  muscleOptions: MultiSelectOption[] = [];

  @Input() muscleIds: number[] = [];

  private muscleService: MuscleService = inject(MuscleService);

  onChange: (value: number[]) => void = () => {
  };

  onTouched: ($event: boolean) => void = () => {
  };

  ngOnInit(): void {
    this.muscleService.muscles.subscribe((muscles: Muscle[]) => {
      let options: MultiSelectOption[] = []
      muscles.forEach((muscle: Muscle) => {
        options.push({
          id: muscle.id,
          title: muscle.name,
          value: muscle,
          description: muscle.description
        });
      });
      this.muscleOptions = [...options];
    });
    this.muscleService.isLoading.subscribe((loading: boolean) => this.loading = loading);
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
