import {Component, computed, input} from '@angular/core';
import {User} from "../../../model/dto/user";
import {Role} from "../../../model/dto/role";
import {Privilege} from "../../../model/dto/privilege";
import {Dictionary} from "../../../model/common/dictionary";

@Component({
  selector: 'app-user-details-display',
  templateUrl: './user-details-display.component.html'
})
export class UserDetailsDisplayComponent {

  readonly user = input.required<User | undefined>();

  rolePrivileges = computed<Dictionary<string>>(() => {
    const rolePrivileges: Dictionary<string> = {};
    const user = this.user();
    if (user) {
      user.roles.forEach((role: Role) => {
        let privileges: string[] = role.privileges.map((privilege: Privilege) => privilege.name);
        rolePrivileges[role.id] = privileges.join(", ");
      })
    }
    return rolePrivileges;
  });
}
