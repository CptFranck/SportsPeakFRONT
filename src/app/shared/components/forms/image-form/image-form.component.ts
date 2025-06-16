import {Component, computed, inject, input, OnDestroy, OnInit, output, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CurrentUserService} from "../../../../core/services/current-user/current-user.service";
import {Subject, takeUntil} from "rxjs";
import {FileUploadComponent} from "../../inputs/file-upload/file-upload.component";
import {InputControlComponent} from "../../input-control/input-control.component";
import {IllustrationService} from "../../../../core/services/illustration/illustration.service";
import {fileTypeValidator} from "../../../validators/fileTypeValidator";
import {fileWeightValidator} from "../../../validators/fileWeightValidator";

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
  private readonly currentUserService = inject(CurrentUserService);
  private readonly illustrationService = inject(IllustrationService);

  ngOnInit() {
    this.currentUserService.currentUser$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this.isAdmin.set(this.currentUserService.isAdmin()));
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
