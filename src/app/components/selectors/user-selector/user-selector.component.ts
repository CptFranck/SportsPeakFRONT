import {Component, forwardRef, inject, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {MultiSelectOption} from "../../../interface/components/multi-select/multiSelectOption";
import {UserService} from "../../../services/user/user.service";
import {User} from "../../../interface/dto/user";
import {MultiSelectComponent} from "../../multi-select/multi-select.component";

@Component({
  selector: 'app-user-selector',
  standalone: true,
  imports: [
    MultiSelectComponent
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UserSelectorComponent),
      multi: true,
    }
  ],
  templateUrl: './user-selector.component.html',
})
export class UserSelectorComponent implements OnInit, ControlValueAccessor {
  loading: boolean = true;
  userOptions: MultiSelectOption[] = [];

  @Input() userIds: number[] = [];

  private userService: UserService = inject(UserService);

  onChange: (value: number[]) => void = () => {
  };

  onTouched: ($event: boolean) => void = () => {
  };

  ngOnInit(): void {
    this.userService.users.subscribe((users: User[]) => {
      let options: MultiSelectOption[] = []
      users.forEach((user: User) => {
        options.push({
          id: user.id.toString(),
          title: user.username,
          value: user,
          description: "First Name : " + user.firstName + " Last Name : " + user.lastName,
        });
      });
      this.userOptions = [...options];
    });
    this.userService.isLoading.subscribe((loading: boolean) => this.loading = loading);
  }

  writeValue(roleIds: number[]): void {
    this.userIds = roleIds;
  }

  registerOnChange(fn: (value: number[]) => void): void {
    this.onChange = fn
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn
  }

  setUserIds(userIds: number[]) {
    this.userIds = userIds;
    this.onChange(userIds);
  }
}
