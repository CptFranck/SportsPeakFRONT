import {Component, forwardRef, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {MultiSelectOption} from "../../../interface/components/multi-select/multiSelectOption";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {RoleService} from "../../../services/role/role.service";
import {Role} from "../../../interface/dto/role";
import {Privilege} from "../../../interface/dto/privilege";
import {MultiSelectComponent} from "../../multi-select/multi-select.component";
import {Subject, takeUntil} from "rxjs";

@Component({
    selector: 'app-roles-selector',
    imports: [
        MultiSelectComponent
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => RoleSelectorComponent),
            multi: true,
        }
    ],
    templateUrl: './role-selector.component.html'
})
export class RoleSelectorComponent implements OnInit, OnDestroy, ControlValueAccessor {
  loading: boolean = true;
  roleOptions: MultiSelectOption[] = [];

  @Input() roleIds: number[] = [];

  private readonly unsubscribe$: Subject<void> = new Subject<void>();
  private readonly roleService: RoleService = inject(RoleService);

  onChange: (value: number[]) => void = () => {
  };

  onTouched: ($event: boolean) => void = () => {
  };

  ngOnInit(): void {
    this.roleService.roles
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((roles: Role[]) => {
        let options: MultiSelectOption[] = []
        roles.forEach((role: Role) => {
          options.push({
            id: role.id.toString(),
            title: role.name,
            value: role,
            description: "Privilege(s) included : " + role.privileges.map((privilege: Privilege) => privilege.name).join(", ")
          });
        });
        this.roleOptions = [...options];
      });
    this.roleService.isLoading
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((loading: boolean) => this.loading = loading);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  writeValue(roleIds: number[]): void {
    this.roleIds = roleIds;
  }

  registerOnChange(fn: (value: number[]) => void): void {
    this.onChange = fn
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn
  }

  setRoleIds(roleIds: number[]) {
    this.roleIds = roleIds;
    this.onChange(roleIds);
  }
}
