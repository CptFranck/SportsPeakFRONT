import {Component, inject, input, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject, takeUntil} from "rxjs";
import {Privilege} from "../../../../shared/model/dto/privilege";
import {PrivilegeService} from "../../../../core/services/privilege/privilege.service";
import {ActionEnum} from "../../../../shared/model/enum/action.enum";

@Component({
  selector: 'app-privilege-delete-forms',
  templateUrl: './privilege-delete-form.component.html'
})
export class PrivilegeDeleteFormComponent implements OnInit, OnDestroy {

  readonly privilege = input.required<Privilege | undefined>();
  readonly btnCloseRef = input.required<HTMLButtonElement>();
  readonly submitEventActionType$ = input.required<Observable<ActionEnum> | undefined>();

  private readonly unsubscribe$ = new Subject<void>();
  private readonly privilegeService = inject(PrivilegeService);

  ngOnInit() {
    const submitEventActionType$ = this.submitEventActionType$();
    if (submitEventActionType$)
      submitEventActionType$
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((actionType: ActionEnum) => {
          if (actionType === ActionEnum.delete)
            this.onSubmit();
        });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onSubmit() {
    const privilege = this.privilege();
    if (!privilege) return;
    this.privilegeService.deletePrivilege(privilege);
    this.btnCloseRef().click();
  }
}
