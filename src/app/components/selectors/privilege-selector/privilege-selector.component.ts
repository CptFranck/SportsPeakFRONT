import {Component, forwardRef, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {MultiSelectOption} from "../../../interface/components/multi-select/multiSelectOption";
import {Privilege} from "../../../interface/dto/privilege";
import {PrivilegeService} from "../../../services/privilege/privilege.service";
import {MultiSelectComponent} from "../../multi-select/multi-select.component";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-privilege-selector',
  standalone: true,
  imports: [
    MultiSelectComponent
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PrivilegeSelectorComponent),
      multi: true,
    }
  ],
  templateUrl: './privilege-selector.component.html',
})
export class PrivilegeSelectorComponent implements OnInit, OnDestroy, ControlValueAccessor {
  loading: boolean = true;
  privilegeOptions: MultiSelectOption[] = [];

  @Input() privilegeIds: number[] = [];

  private unsubscribe$: Subject<void> = new Subject<void>();
  private privilegeService: PrivilegeService = inject(PrivilegeService);

  onChange: (value: number[]) => void = () => {
  };

  onTouched: ($event: boolean) => void = () => {
  };

  ngOnInit(): void {
    this.privilegeService.privileges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((privileges: Privilege[]) => {
        let options: MultiSelectOption[] = []
        privileges.forEach((privilege: Privilege) => {
          options.push({
            id: privilege.id.toString(),
            title: privilege.name,
            value: privilege,
          });
        });
        this.privilegeOptions = [...options];
      });
    this.privilegeService.isLoading.subscribe((loading: boolean) => this.loading = loading);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  writeValue(roleIds: number[]): void {
    this.privilegeIds = roleIds;
  }

  registerOnChange(fn: (value: number[]) => void): void {
    this.onChange = fn
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn
  }

  setPrivilegeIds(roleIds: number[]) {
    this.privilegeIds = roleIds;
    this.onChange(roleIds);
  }
}
