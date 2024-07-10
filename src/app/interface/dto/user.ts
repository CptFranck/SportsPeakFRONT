import {Role} from "./role";
import {ProgExercise} from "./prog-exercise";

export interface User {
  id: string,
  email: string,
  firstName: string,
  lastName: string,
  username: string,
  roles: Role[],
  subscribedProgExercises: ProgExercise[]
  progExercisesCreated: ProgExercise[]
}
