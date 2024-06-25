import {Component, forwardRef, inject, Input, OnInit} from '@angular/core';
import {MultiSelectComponent} from "../multi-select/multi-select.component";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {Option} from "../../../interface/multi-select/option";
import {Privilege} from "../../../interface/dto/privilege";
import {PrivilegeService} from "../../../services/privilege/privilege.service";

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
export class PrivilegeSelectorComponent implements OnInit, ControlValueAccessor {
  loading: boolean = true;
  privilegeOptions: Option[] = [];

  @Input() privilegeIds: number[] = [];

  private privilegeService: PrivilegeService = inject(PrivilegeService);

  onChange: (value: number[]) => void = () => {
  };

  onTouched: ($event: boolean) => void = () => {
  };

  ngOnInit(): void {
    this.privilegeService.privileges.subscribe((privileges: Privilege[]) => {
      let options: Option[] = []
      privileges.forEach((privilege: Privilege) => {
        options.push({
          id: privilege.id,
          title: privilege.name,
          value: privilege,
        });
      });
      this.privilegeOptions = [...options];
    });
    this.privilegeService.isLoading.subscribe((loading: boolean) => this.loading = loading);
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
