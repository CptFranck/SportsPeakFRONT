import {AfterViewInit, Component, inject, Input} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {Role} from "../../../../../interface/dto/role";
import {RoleService} from "../../../../../services/role/role.service";

@Component({
  selector: 'app-role-delete-form',
  standalone: true,
  imports: [],
  templateUrl: './role-delete-form.component.html',
})
export class RoleDeleteFormComponent implements AfterViewInit {
  eventsSubscription!: Subscription;

  @Input() role!: Role | undefined;
  @Input() btnCloseRef!: HTMLButtonElement;
  @Input() submitEvents!: Observable<void> | undefined;

  private roleService: RoleService = inject(RoleService);

  ngAfterViewInit() {
    if (this.submitEvents)
      this.eventsSubscription = this.submitEvents.subscribe(() => this.onSubmit());
  }

  onSubmit() {
    if (!this.role) return;
    this.roleService.deleteRole(this.role);
    this.btnCloseRef.click();
  }
}
