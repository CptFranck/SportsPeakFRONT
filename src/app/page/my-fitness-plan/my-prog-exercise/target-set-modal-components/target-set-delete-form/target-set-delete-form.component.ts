import {AfterViewInit, Component, inject, Input} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {TargetSet} from "../../../../../interface/dto/target-set";
import {TargetSetService} from "../../../../../services/target-set/target-set.service";

@Component({
  selector: 'app-target-set-delete-form',
  standalone: true,
  imports: [],
  templateUrl: './target-set-delete-form.component.html',
})
export class TargetSetDeleteFormComponent implements AfterViewInit {
  eventsSubscription!: Subscription;

  @Input() targetSet!: TargetSet | undefined;
  @Input() btnCloseRef!: HTMLButtonElement;
  @Input() submitEvents!: Observable<void> | undefined;

  private targetSetService: TargetSetService = inject(TargetSetService);

  ngAfterViewInit() {
    if (this.submitEvents)
      this.eventsSubscription = this.submitEvents.subscribe(() => this.onSubmit());
  }

  onSubmit() {
    if (!this.targetSet) return;
    this.targetSetService.deleteTargetSet(this.targetSet);
    this.btnCloseRef.click();
  }
}
