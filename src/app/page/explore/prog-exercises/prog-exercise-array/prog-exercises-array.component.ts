import {Component, inject, input, OnChanges, OnDestroy, OnInit, output, signal} from '@angular/core';
import {FormIndicator} from "../../../../shared/model/common/form-indicator";
import {UserLoggedService} from "../../../../core/services/user-logged/user-logged.service";
import {ModalButtonComponent} from "../../../../components/modal/modal-button/modal-button.component";
import {ProgExercise} from "../../../../shared/model/dto/prog-exercise";
import {User} from "../../../../shared/model/dto/user";
import {ProgExerciseRowDetail} from "../../../../shared/model/common/prog-exercise-row-detail";
import {Dictionary} from "../../../../shared/model/common/dictionary";
import {Subject, takeUntil} from "rxjs";
import {ActionEnum} from "../../../../shared/model/enum/action.enum";

@Component({
  selector: 'app-prog-exercises-array',
  imports: [
    ModalButtonComponent,
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

  readonly actionMuscle = output<FormIndicator>();

  private readonly unsubscribe$ = new Subject<void>();
  private readonly userLoggedService = inject(UserLoggedService);

  ngOnInit() {
    this.userLoggedService.currentUser
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((user: User | undefined) => {
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
      actionType: ActionEnum.read,
      object: progExercise
    });
  }

  // subScribeToProgExercise(progExercise: ProgExercise): void {
  //   this.actionMuscle.emit({
  //     actionType: ActionEnum.read,
  //     object: progExercise
  //   });
  // }

  getDisplayedMuscles(progExercise: ProgExercise) {
    const showAll = this.progExerciseDetails()[progExercise.id].show;
    return showAll
      ? progExercise.exercise.muscles
      : progExercise.exercise.muscles.slice(0, 2);
  }

  shouldShowEllipsis(progExercise: ProgExercise) {
    const showAll = this.progExerciseDetails()[progExercise.id].show;
    return !showAll && progExercise.exercise.muscles.length > 3;
  }
}
