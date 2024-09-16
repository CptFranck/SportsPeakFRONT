import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject, takeUntil} from "rxjs";
import {Privilege} from "../../../../interface/dto/privilege";
import {PrivilegeService} from "../../../../services/privilege/privilege.service";
import {ActionType} from "../../../../interface/enum/action-type";

@Component({
  selector: 'app-privilege-delete-forms',
  standalone: true,
  imports: [],
  templateUrl: './privilege-delete-form.component.html',
})
export class PrivilegeDeleteFormComponent implements OnInit, OnDestroy {

  @Input() privilege!: Privilege | undefined;
  @Input() btnCloseRef!: HTMLButtonElement;
  @Input() submitEventActionType$!: Observable<ActionType> | undefined;

  private unsubscribe$: Subject<void> = new Subject<void>();
  private privilegeService: PrivilegeService = inject(PrivilegeService);

  ngOnInit() {
    if (this.submitEventActionType$)
      this.submitEventActionType$
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((actionType: ActionType) => {
          if (actionType === ActionType.delete)
            this.onSubmit();
        });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onSubmit() {
    if (!this.privilege) return;
    this.privilegeService.deletePrivilege(this.privilege);
    this.btnCloseRef.click();
  }
}
