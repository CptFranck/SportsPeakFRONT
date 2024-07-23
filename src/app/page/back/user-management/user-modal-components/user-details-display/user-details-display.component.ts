import {Component, Input, OnChanges} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {User} from "../../../../../interface/dto/user";
import {Role} from "../../../../../interface/dto/role";
import {Privilege} from "../../../../../interface/dto/privilege";
import {Dictionary} from "../../../../../interface/utils/dictionary";

@Component({
  selector: 'app-user-details-display',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './user-details-display.component.html',
})
export class UserDetailsDisplayComponent implements OnChanges {
  rolePrivileges: Dictionary<string> = {};

  @Input() user: User | undefined;
  @Input() action!: string;

  ngOnChanges(): void {
    if (this.user) {
      this.user.roles.forEach((role: Role) => {
        let privileges: string[] = role.privileges.map((privilege: Privilege) => privilege.name);
        this.rolePrivileges[role.id] = privileges.join(", ");
      })
    }
  }
}
