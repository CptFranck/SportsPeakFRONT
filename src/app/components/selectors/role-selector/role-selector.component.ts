import {Component, forwardRef, inject, OnDestroy, OnInit, signal} from '@angular/core';
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
  loading = true;
  roleOptions: MultiSelectOption[] = [];

  roleIds = signal<number[]>([]);

  private readonly unsubscribe$ = new Subject<void>();
  private readonly roleService = inject(RoleService);


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

  onChange: (value: number[]) => void = () => {
  };

  onTouched: () => void = () => {
  };

  writeValue(roleIds: number[]): void {
    this.roleIds.set([...roleIds]);
  }

  registerOnChange(fn: (value: number[]) => void): void {
    this.onChange = fn
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn
  }

  setRoleIds(roleIds: number[]) {
    this.roleIds.set([...roleIds]);
    this.onChange(roleIds);
  }
}
