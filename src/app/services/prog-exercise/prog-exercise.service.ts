import {inject, Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Apollo, MutationResult} from "apollo-angular";
import {AlertService} from "../alert/alert.service";
import {ApolloQueryResult} from "@apollo/client";
import {FormGroup} from "@angular/forms";
import {ProgExercise} from "../../interface/dto/prog-exercise";
import {
  ADD_PROG_EXERCISE,
  DEL_PROG_EXERCISE,
  GET_PROG_EXERCISE_BY_ID,
  GET_PROG_EXERCISES,
  GET_USER_PROG_EXERCISES,
  MOD_PROG_EXERCISE,
  MOD_PROG_EXERCISE_TRUST_LABEL
} from "../../graphql/operations/prog-exercise.operations";
import {User} from "../../interface/dto/user";
import {UserLoggedService} from "../user-logged/user-logged.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ProgExerciseService {

  progExercise: BehaviorSubject<ProgExercise | undefined> = new BehaviorSubject<ProgExercise | undefined>(undefined);
  progExercises: BehaviorSubject<ProgExercise[]> = new BehaviorSubject<ProgExercise[]>([]);
  userProgExercises: BehaviorSubject<ProgExercise[]> = new BehaviorSubject<ProgExercise[]>([]);
  isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private router: Router = inject(Router);
  private apollo: Apollo = inject(Apollo);
  private alertService: AlertService = inject(AlertService);
  private userLoggedService: UserLoggedService = inject(UserLoggedService);

  constructor() {
    this.getProgExercises();
    this.userLoggedService.currentUser.subscribe((user: User | undefined) => {
      if (user) {
        this.getUserProgExercises(user)
      }
    })
  }

  getProgExercises() {
    return this.apollo.watchQuery({
      query: GET_PROG_EXERCISES,
    }).valueChanges.subscribe((result: ApolloQueryResult<any>): void => {
      if (result.errors) {
        this.alertService.graphQLErrorAlertHandler(result.errors);
      }
      this.progExercises.next(result.data.getProgExercises);
      this.isLoading.next(result.loading);
    });
  }

  getProgExerciseById(progExerciseId: number) {
    return this.apollo.watchQuery({
      query: GET_PROG_EXERCISE_BY_ID,
      variables: {
        id: progExerciseId
      }
    }).valueChanges.subscribe((result: ApolloQueryResult<any>): void => {
      if (result.errors) {
        this.alertService.graphQLErrorAlertHandler(result.errors);
      }
      this.progExercise.next(result.data.getProgExerciseById);
      this.isLoading.next(result.loading);
    });
  }

  getUserProgExercises(user: User) {
    return this.apollo.watchQuery({
      query: GET_USER_PROG_EXERCISES,
      variables: {
        userId: user.id
      }
    }).valueChanges.subscribe((result: ApolloQueryResult<any>): void => {
      if (result.errors) {
        this.alertService.graphQLErrorAlertHandler(result.errors);
      }
      this.userProgExercises.next(result.data.getUserProgExercises);
      this.isLoading.next(result.loading);
    });
  }

  addProgExercise(progExercisesForm: FormGroup) {
    const user: User | undefined = this.userLoggedService.currentUser.value
    if (user)
      return this.apollo.mutate({
        mutation: ADD_PROG_EXERCISE,
        variables: {
          inputNewProgExercise: progExercisesForm.value,
        },
        refetchQueries: [{
          query: GET_USER_PROG_EXERCISES,
          variables: {
            userId: user.id
          }
        }]
      }).subscribe(
        (result: MutationResult): void => {
          if (result.errors) {
            this.alertService.graphQLErrorAlertHandler(result.errors);
          } else {
            let message: string = "Programed exercise " + result.data.addProgExercise.name + " been successfully created.";
            this.alertService.addSuccessAlert(message);
          }
        });
    else
      return this.alertService.addErrorAlert("User not logged in.");
  }

  modifyProgExercise(progExercisesForm: FormGroup) {
    const user: User | undefined = this.userLoggedService.currentUser.value
    if (user)
      this.apollo.mutate({
        mutation: MOD_PROG_EXERCISE,
        variables: {
          inputProgExercise: progExercisesForm.value,
        },
        refetchQueries: [{
          query: GET_USER_PROG_EXERCISES,
          variables: {
            userId: user.id
          }
        }]
      }).subscribe((result: MutationResult): void => {
        if (result.errors) {
          this.alertService.graphQLErrorAlertHandler(result.errors);
        } else {
          let message: string = "Programed exercise " + result.data.modifyProgExercise.name + " been successfully updated.";
          this.alertService.addSuccessAlert(message);
        }
      });
    else
      return this.alertService.addErrorAlert("User not logged in.");
  }

  modifyProgExerciseTrustLabel(progExercisesForm: FormGroup) {
    const user: User | undefined = this.userLoggedService.currentUser.value
    if (user)
      return this.apollo.mutate({
        mutation: MOD_PROG_EXERCISE_TRUST_LABEL,
        variables: {
          inputProgExerciseTrustLabel: progExercisesForm.value,
        },
        refetchQueries: [{
          query: GET_USER_PROG_EXERCISES,
          variables: {
            userId: user.id
          }
        }]
      }).subscribe((result: MutationResult): void => {
        if (result.errors) {
          this.alertService.graphQLErrorAlertHandler(result.errors);
        } else {
          let message: string = "Programed exercise " + result.data.modifyProgExerciseTrustLabel.name + " been successfully updated.";
          this.alertService.addSuccessAlert(message);
        }
      });
    else
      return this.alertService.addErrorAlert("User not logged in.");
  }

  deleteProgExercises(progExercise: ProgExercise) {
    const user: User | undefined = this.userLoggedService.currentUser.value
    if (user) {
      this.apollo.mutate({
        mutation: DEL_PROG_EXERCISE,
        variables: {
          progExerciseId: progExercise.id,
        },
        refetchQueries: [{
          query: GET_USER_PROG_EXERCISES,
          variables: {
            userId: user.id
          }
        }]
      }).subscribe((result: MutationResult): void => {
        if (result.errors) {
          this.alertService.graphQLErrorAlertHandler(result.errors);
        } else {
          let message: string = "Programed exercise " + progExercise.name + " has been successfully deleted.";
          this.alertService.addSuccessAlert(message);
        }
      });
      this.router.navigateByUrl('/my-fitness-plan/my-programed-exercises')
    } else {
      return this.alertService.addErrorAlert("User not logged in.");
    }
  }
}
