import {Component, inject, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {PrivilegesArrayComponent} from "../privileges-array/privileges-array.component";
import {PrivilegeModalComponent} from "../privilege-modal/privilege-modal.component";
import {LoadingComponent} from "../../../../components/loading/loading.component";
import {MuscleModalComponent} from "../../../docs/muscles/muscle-modal/muscle-modal.component";
import {MusclesArrayComponent} from "../../../docs/muscles/muscles-array/muscles-array.component";
import {Privilege} from "../../../../interface/dto/privilege";
import {ActionType} from "../../../../interface/enum/action-type";
import {PrivilegeService} from "../../../../services/privilege/privilege.service";
import {FormIndicator} from "../../../../interface/utils/form-indicator";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-privileges',
  standalone: true,
  imports: [
    LoadingComponent,
    MuscleModalComponent,
    MusclesArrayComponent,
    PrivilegesArrayComponent,
    PrivilegeModalComponent
  ],
  templateUrl: './privileges.component.html',
})
export class PrivilegesComponent implements OnInit, OnDestroy {
  loading: boolean = true;
  privileges: Privilege[] = [];
  privilege: Privilege | undefined;
  action: ActionType = ActionType.create;
  modalTitle: string = "";
  privilegeModalId: string = "privilegeModal";

  @ViewChild("modalTemplate") modalTemplate!: TemplateRef<any>;

  private readonly unsubscribe$: Subject<void> = new Subject<void>();
  private readonly privilegeService: PrivilegeService = inject(PrivilegeService);

  ngOnInit(): void {
    this.privilegeService.privileges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((privileges: Privilege[]) =>
        this.privileges = privileges);
    this.privilegeService.isLoading
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((isLoading: boolean) =>
        this.loading = isLoading);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  setPrivilege(formIndicator: FormIndicator) {
    this.privilege = formIndicator.object;
    this.action = formIndicator.actionType;
    if (formIndicator.object === undefined)
      this.modalTitle = "Add new muscle";
    else
      this.modalTitle = formIndicator.object.name;
  }
}
