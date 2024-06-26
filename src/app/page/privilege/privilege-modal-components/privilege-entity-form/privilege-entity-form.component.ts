import {AfterViewInit, Component, inject, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Observable, Subscription} from "rxjs";
import {Privilege} from "../../../../interface/dto/privilege";
import {PrivilegeService} from "../../../../services/privilege/privilege.service";
import {Role} from "../../../../interface/dto/role";
import {InputControlComponent} from "../../../../components/input-control/input-control.component";
import {RoleSelectorComponent} from "../../../../components/select/role-selector/role-selector.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-privilege-entity-form',
  standalone: true,
  imports: [
    InputControlComponent,
    RoleSelectorComponent,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './privilege-entity-form.component.html',
})
export class PrivilegeEntityFormComponent implements OnInit, AfterViewInit {

  privilege: Privilege | undefined;
  privilegeForm: FormGroup | null = null;
  submitInvalidForm: boolean = false;
  eventsSubscription!: Subscription;

  @Input() isAdmin: boolean = false;
  @Input() btnCloseRef!: HTMLButtonElement;
  @Input() submitEvents!: Observable<void> | undefined;

  private privilegeService: PrivilegeService = inject(PrivilegeService);

  @Input() set privilegeInput(value: Privilege | undefined) {
    this.privilege = value;
    this.initializeMuscleForm();
  }

  ngOnInit() {
    this.initializeMuscleForm()
  }

  ngAfterViewInit() {
    if (this.submitEvents)
      this.eventsSubscription = this.submitEvents.subscribe(() => this.onSubmit());
  }

  initializeMuscleForm() {
    const exerciseIdsValidator =
      this.isAdmin ? null : Validators.required;
    const privilegeName: string = this.privilege ? this.privilege.name : "";
    const privilegeRoleIds: string[] = this.privilege?.roles ?
      this.privilege.roles?.map((role: Role) => role.id) : [];

    this.privilegeForm = new FormGroup({
      name: new FormControl(privilegeName,
        [Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50)]),
      roleIds: new FormControl(
        privilegeRoleIds, exerciseIdsValidator
      ),
    });

    if (this.privilege)
      this.privilegeForm.addControl("id", new FormControl(this.privilege.id));
  }

  onSubmit() {
    if (!this.privilegeForm) return;
    if (this.privilegeForm.valid) {
      this.submitInvalidForm = false;
      if (!this.privilegeForm.value.id) {
        this.privilegeService.addPrivilege(this.privilegeForm);
      } else {
        this.privilegeService.modifyPrivilege(this.privilegeForm);
      }
      this.btnCloseRef.click();
    } else {
      this.submitInvalidForm = true;
    }
  }
}
