import {Component, inject} from '@angular/core';
import {AlertComponent} from "../alert/alert.component";
import {NgForOf} from "@angular/common";
import {Alert} from "../../interface/utils/alert";
import {AlertService} from "../../services/alert/alert.service";

@Component({
  selector: 'app-alert-display',
  standalone: true,
  imports: [
    AlertComponent,
    NgForOf
  ],
  templateUrl: './alert-display.component.html',
})
export class AlertDisplayComponent {
  alerts!: Alert[]
  // alerts: Alert[]
  //   = [{
  //   "id": 0,
  //   "title": "Unsuccessful operation :(",
  //   "message": "org.springframework.dao.DataIntegrityViolationException: could not execute statement [ERROR: update or delete on table \"exercise_type\" violates foreign key constraint \"fk6jy6x1k4t53mwwrlbhqg7f18l\" on table \"classified_exercise\"\n  Détail : Key (id)=(7) is still referenced from table \"classified_exercise\".] [delete from exercise_type where id=?]; SQL [delete from exercise_type where id=?]; constraint [fk6jy6x1k4t53mwwrlbhqg7f18l]",
  //   "type": AlertType.error,
  //   "closed": false,
  //   "errorInformation": {
  //     "errorType": AlertErrorType.GraphQLError,
  //     "errorLocation": [
  //       {
  //         "line": 2,
  //         "column": 3
  //       }
  //     ],
  //     "errorPath": [
  //       "deleteExerciseType"
  //     ]
  //   }
  // }];
  alertService: AlertService = inject(AlertService);

  constructor() {
    this.alertService.getAlertsSubject().subscribe(als => {
      this.alerts = als;
    })
  }

  removeAlert(alert: Alert) {
    this.alertService.closeAlert(alert)
  }
}
