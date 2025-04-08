import {Component, EventEmitter, inject, input, OnChanges, OnDestroy, OnInit, Output, signal} from '@angular/core';
import {FormIndicator} from "../../../../interface/utils/form-indicator";
import {UserLoggedService} from "../../../../services/user-logged/user-logged.service";
import {ActionType} from "../../../../interface/enum/action-type";
import {ModalButtonComponent} from "../../../../components/modal/modal-button/modal-button.component";
import {NgForOf, NgIf} from "@angular/common";
import {ProgExercise} from "../../../../interface/dto/prog-exercise";
import {User} from "../../../../interface/dto/user";
import {ProgExerciseRowDetail} from "../../../../interface/utils/prog-exercise-row-detail";
import {Dictionary} from "../../../../interface/utils/dictionary";
import {Subject} from "rxjs";

@Component({
  selector: 'app-prog-exercises-array',
  imports: [
    ModalButtonComponent,
    NgForOf,
    NgIf
  ],
  templateUrl: './prog-exercises-array.component.html'
})
export class ProgExercisesArrayComponent implements OnInit, OnChanges, OnDestroy {
  isAdmin = signal<boolean>(false);
  userLogged = signal<User | undefined>(undefined);
  progExerciseDetails = signal<Dictionary<ProgExerciseRowDetail>>({});
  subscribeClassButton = signal<string>("btn-success");

  readonly progExercises = input.required<ProgExercise[]>();
  readonly modalId = input.required<string>();

  // TODO : implémenté la souscription à un prog exercise et gérer le cas de ces propres exercices
  // userCreatedProExercise: ProgExercise[] | undefined;
  // userSubscribedProExercise: ProgExercise[] | undefined;

  @Output() actionMuscle = new EventEmitter<FormIndicator>();

  private readonly unsubscribe$ = new Subject<void>();
  private readonly userLoggedService = inject(UserLoggedService);

  ngOnInit() {
    this.userLoggedService.currentUser.subscribe((user: User | undefined) => {
      this.userLogged.set(user);
      this.isAdmin.set(this.userLoggedService.isAdmin())
    });
  }

  ngOnChanges(): void {
    this.progExercises().forEach((progExercise: ProgExercise) => {
      let detail: ProgExerciseRowDetail = {show: false, subscribed: false, creator: false};
      // if (this.userCreatedProExercise) {
      //   console.log("test")
      //   detail.creator = this.userCreatedProExercise.some(
      //     (progEx: ProgExercise) => progExercise.id === progEx.id
      //   );
      // }
      // if (this.userSubscribedProExercise) {
      //   console.log("test")
      //   detail.subscribed = this.userSubscribedProExercise.some(
      //     (progEx: ProgExercise) => progExercise.id === progEx.id
      //   );
      // }
      this.progExerciseDetails.update(value => ({...value, [progExercise.id]: detail}));
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  expendProgExerciseDetails(id: string): void {
    this.progExerciseDetails.update(value => ({
      ...value, [id]: {
        ...value[id], show: !value[id].show
      }
    }));
  }

  showMuscleDetails(progExercise: ProgExercise): void {
    this.actionMuscle.emit({
      actionType: ActionType.read,
      object: progExercise
    });
  }

  // subScribeToProgExercise(progExercise: ProgExercise): void {
  //   this.actionMuscle.emit({
  //     actionType: ActionType.read,
  //     object: progExercise
  //   });
  // }
}
