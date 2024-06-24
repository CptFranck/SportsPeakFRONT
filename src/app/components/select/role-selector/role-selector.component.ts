import {Component, inject, Input, OnInit} from '@angular/core';
import {Option} from "../../../interface/multi-select/option";
import {ControlValueAccessor} from "@angular/forms";
import {RoleService} from "../../../services/role/role.service";
import {MultiSelectComponent} from "../multi-select/multi-select.component";
import {Role} from "../../../interface/dto/role";
import {Privilege} from "../../../interface/dto/privilege";

@Component({
  selector: 'app-role-selector',
  standalone: true,
  imports: [
    MultiSelectComponent
  ],
  templateUrl: './role-selector.component.html',
})
export class RoleSelectorComponent implements OnInit, ControlValueAccessor {
  loading: boolean = true;
  roleOptions: Option[] = [];

  @Input() roleIds: number[] = [];

  private roleService: RoleService = inject(RoleService);

  onChange: (value: number[]) => void = () => {
  };

  onTouched: ($event: boolean) => void = () => {
  };

  ngOnInit(): void {
    this.roleService.roles.subscribe((roles: Role[]) => {
      let options: Option[] = []
      roles.forEach((role: Role) => {
        options.push({
          id: role.id,
          title: role.name,
          value: role,
          description: "Privilege(s) included : " + role.privileges.map((privilege: Privilege) => privilege.name).join(", ")
        });
      });
      console.log(roles)
      this.roleOptions = [...options];
    });
    this.roleService.isLoading.subscribe((loading: boolean) => this.loading = loading);
  }

  writeValue(exerciseIds: number[]): void {
    this.roleIds = exerciseIds;
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
