import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {UserLoggedService} from "../../../services/user-logged/user-logged.service";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-image-form',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './image-form.component.html',
})
export class ImageFormComponent implements OnInit, OnDestroy {
  isAdmin = signal<boolean>(false);

  private readonly unsubscribe$ = new Subject<void>();
  private readonly userLoggedService = inject(UserLoggedService);


  ngOnInit() {
    this.userLoggedService.currentUser
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.isAdmin.set(this.userLoggedService.isAdmin())
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  // readonly targetSetForm = computed<FormGroup>(() => {
  //   const targetSetForm: FormGroup = new FormGroup(
  //     {
  //       state: new FormControl(
  //         this.targetSet().state,
  //         [Validators.required]),
  //     });
  //   targetSetForm.addControl("id", new FormControl(this.targetSet().id));
  //   return targetSetForm;
  // });

  // private readonly targetSetService = inject(TargetSetService);

  // openForm(): void {
  //   this.admin.set(true);
  // }
  //
  // submit() {
  //   const targetSetForm = this.targetSetForm()
  //   if (targetSetForm.valid) {
  //     this.targetSetService.modifyTargetSetState(targetSetForm);
  //     this.admin.set(false);
  //   }
  // }
}
