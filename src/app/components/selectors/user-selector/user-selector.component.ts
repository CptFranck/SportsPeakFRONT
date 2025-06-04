import {Component, forwardRef, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {MultiSelectOption} from "../../../shared/model/component/multi-select/multiSelectOption";
import {UserService} from "../../../core/services/user/user.service";
import {User} from "../../../shared/model/dto/user";
import {MultiSelectComponent} from "../../multi-select/multi-select.component";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-user-selector',
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
  templateUrl: './user-selector.component.html'
})
export class UserSelectorComponent implements OnInit, OnDestroy, ControlValueAccessor {
  userIds = signal<number[]>([]);
  loading = signal<boolean>(true);
  userOptions = signal<MultiSelectOption[]>([]);

  private readonly unsubscribe$ = new Subject<void>();
  private readonly userService = inject(UserService);

  ngOnInit(): void {
    this.userService.users
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((users: User[]) => {
        let options: MultiSelectOption[] = []
        users.forEach((user: User) => {
          options.push({
            id: user.id.toString(),
            title: user.username,
            value: user,
            description: "First Name : " + user.firstName + " Last Name : " + user.lastName,
          });
        });
        this.userOptions.set([...options]);
      });
    this.userService.isLoading
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

  writeValue(userIds: number[]): void {
    this.userIds.set([...userIds]);
  }

  registerOnChange(fn: (value: number[]) => void): void {
    this.onChange = fn
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn
  }

  setUserIds(userIds: number[]) {
    this.userIds.set([...userIds]);
    this.onChange(userIds);
  }
}
