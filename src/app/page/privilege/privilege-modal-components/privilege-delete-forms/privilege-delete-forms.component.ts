import {AfterViewInit, Component, inject, Input} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {Privilege} from "../../../../interface/dto/privilege";
import {PrivilegeService} from "../../../../services/privilege/privilege.service";

@Component({
  selector: 'app-privilege-delete-forms',
  standalone: true,
  imports: [],
  templateUrl: './privilege-delete-forms.component.html',
})
export class PrivilegeDeleteFormsComponent implements AfterViewInit {
  eventsSubscription!: Subscription;

  @Input() privilege!: Privilege | undefined;
  @Input() btnCloseRef!: HTMLButtonElement;
  @Input() submitEvents!: Observable<void> | undefined;

  private privilegeService: PrivilegeService = inject(PrivilegeService);

  ngAfterViewInit() {
    if (this.submitEvents)
      this.eventsSubscription = this.submitEvents.subscribe(() => this.onSubmit());
  }

  onSubmit() {
    if (!this.privilege) return;
    this.privilegeService.deletePrivilege(this.privilege);
    this.btnCloseRef.click();
  }
}
