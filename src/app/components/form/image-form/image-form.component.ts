import {Component, computed, inject, input, OnDestroy, OnInit, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserLoggedService} from "../../../services/user-logged/user-logged.service";
import {Subject, takeUntil} from "rxjs";
import {fileTypeValidator, fileWeightValidator} from "../../../validators/confirmValidator";
import {FileUploadComponent} from "../../input/file-upload/file-upload.component";
import {InputControlComponent} from "../../input-control/input-control.component";

@Component({
  selector: 'app-image-form',
  imports: [
    ReactiveFormsModule,
    FileUploadComponent,
    InputControlComponent
  ],
  templateUrl: './image-form.component.html',
})
export class ImageFormComponent implements OnInit, OnDestroy {
  isAdmin = signal<boolean>(false);
  submitInvalidForm = signal<boolean>(false);

  id = input.required<number>();
  type = input.required<String>();

  fileForm = computed<FormGroup>(() => new FormGroup({
    id: new FormControl(
      this.id(),
      [Validators.required,
        Validators.min(0)]),
    type: new FormControl(
      this.type(),
      [Validators.required]),
    file: new FormControl(
      null,
      [Validators.required,
        fileTypeValidator("png"),
        fileWeightValidator(2097152, "2 MB")
      ]),
  }));

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

  onSubmit() {
    const fileForm = this.fileForm()
    if (fileForm.valid) {
      this.submitInvalidForm.set(false);
      console.log(fileForm.value)
    } else {
      this.submitInvalidForm.set(true);
    }
  }
}
