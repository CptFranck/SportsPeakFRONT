import {Component, forwardRef, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {MultiSelectOption} from "../../../shared/model/component/multi-select/multiSelectOption";
import {Privilege} from "../../../shared/model/dto/privilege";
import {PrivilegeService} from "../../../core/services/privilege/privilege.service";
import {MultiSelectComponent} from "../../multi-select/multi-select.component";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-privilege-selector',
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
  templateUrl: './privilege-selector.component.html'
})
export class PrivilegeSelectorComponent implements OnInit, OnDestroy, ControlValueAccessor {
  loading = signal<boolean>(true);
  privilegeIds = signal<number[]>([]);
  privilegeOptions = signal<MultiSelectOption[]>([]);

  private readonly unsubscribe$ = new Subject<void>();
  private readonly privilegeService = inject(PrivilegeService);

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
        this.privilegeOptions.set([...options]);
      });
    this.privilegeService.isLoading
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((loading: boolean) => this.loading.set(loading));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onChange: (value: number[]) => void = () => {
  };

  onTouched: () => void = () => {
  };

  writeValue(privilegeIds: number[]): void {
    this.privilegeIds.set([...privilegeIds]);
  }

  registerOnChange(fn: (value: number[]) => void): void {
    this.onChange = fn
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn
  }

  setPrivilegeIds(privilegeIds: number[]) {
    this.privilegeIds.set([...privilegeIds]);
    this.onChange(privilegeIds);
  }
}
