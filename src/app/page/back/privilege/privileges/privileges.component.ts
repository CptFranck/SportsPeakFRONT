import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {PrivilegesArrayComponent} from "../privileges-array/privileges-array.component";
import {PrivilegeModalComponent} from "../privilege-modal/privilege-modal.component";
import {LoadingComponent} from "../../../../components/loading/loading.component";
import {Privilege} from "../../../../shared/model/dto/privilege";
import {PrivilegeService} from "../../../../core/services/privilege/privilege.service";
import {FormIndicator} from "../../../../shared/model/common/form-indicator";
import {Subject, takeUntil} from "rxjs";
import {ActionEnum} from "../../../../shared/model/enum/action.enum";

@Component({
  selector: 'app-privileges',
  imports: [
    LoadingComponent,
    PrivilegesArrayComponent,
    PrivilegeModalComponent
  ],
  templateUrl: './privileges.component.html'
})
export class PrivilegesComponent implements OnInit, OnDestroy {
  loading = signal<boolean>(true);
  privileges: Privilege[] = [];
  privilege = signal<Privilege | undefined>(undefined);
  action = signal<ActionEnum>(ActionEnum.create);
  modalTitle = signal<string>("");

  readonly privilegeModalId: string = "privilegeModal";

  private readonly unsubscribe$: Subject<void> = new Subject<void>();
  private readonly privilegeService: PrivilegeService = inject(PrivilegeService);

  ngOnInit(): void {
    this.privilegeService.isLoading$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((isLoading: boolean) => this.loading.set(isLoading));
    this.privilegeService.privilegeList$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((privileges: Privilege[]) =>
        this.privileges = privileges);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  setPrivilege(formIndicator: FormIndicator) {
    this.privilege = (formIndicator.object);
    this.action.set(formIndicator.actionType);
    if (formIndicator.object === undefined)
      this.modalTitle.set("Add new muscle");
    else
      this.modalTitle.set(formIndicator.object.name);
  }
}
