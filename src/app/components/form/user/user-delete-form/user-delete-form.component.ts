import {Component, inject, input, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject, takeUntil} from "rxjs";
import {User} from "../../../../shared/model/dto/user";
import {UserService} from "../../../../core/services/user/user.service";
import {ActionTypeEnum} from "../../../../shared/model/enum/action-type.enum";

@Component({
  selector: 'app-user-delete-form',
  templateUrl: './user-delete-form.component.html'
})
export class UserDeleteFormComponent implements OnInit, OnDestroy {
  readonly user = input.required<User | undefined>();
  readonly btnCloseRef = input.required<HTMLButtonElement>();
  readonly submitEventActionType$ = input.required<Observable<ActionTypeEnum> | undefined>();

  private readonly unsubscribe$ = new Subject<void>();
  private readonly userService = inject(UserService);

  ngOnInit() {
    const submitEventActionType$ = this.submitEventActionType$();
    if (submitEventActionType$)
      submitEventActionType$
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((actionType: ActionTypeEnum) => {
          if (actionType === ActionTypeEnum.delete)
            this.onSubmit();
        });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onSubmit() {
    if (!this.user()) return;
    console.log("not fully implemented")
    // this.userService.deleteUser(this.user);
    this.btnCloseRef().click();
  }
}
