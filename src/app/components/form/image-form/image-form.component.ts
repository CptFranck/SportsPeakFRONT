import {Component, computed, inject, input, OnDestroy, OnInit, output, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserLoggedService} from "../../../core/services/user-logged/user-logged.service";
import {Subject, takeUntil} from "rxjs";
import {fileTypeValidator, fileWeightValidator} from "../../../validators/confirmValidator";
import {FileUploadComponent} from "../../input/file-upload/file-upload.component";
import {InputControlComponent} from "../../input-control/input-control.component";
import {IllustrationService} from "../../../core/services/illustration/illustration.service";

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

  refresh = output<string>();

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
  private readonly illustrationService = inject(IllustrationService);

  ngOnInit() {
    this.userLoggedService.currentUser
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.isAdmin.set(this.userLoggedService.isAdmin())
      });
    this.illustrationService.refreshData()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((url: string) => this.refresh.emit(url));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onSubmit() {
    const fileForm = this.fileForm()
    if (fileForm.valid) {
      this.submitInvalidForm.set(false);
      this.illustrationService.postImageUrl(fileForm);
    } else {
      this.submitInvalidForm.set(true);
    }
  }
}
