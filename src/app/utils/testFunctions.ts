import {User} from "../interface/dto/user";
import {Exercise} from "../interface/dto/exercise";
import {ProgExercise} from "../interface/dto/prog-exercise";
import {Visibility} from "../interface/enum/visibility";
import {TrustLabel} from "../interface/enum/trustLabel";
import {Role} from "../interface/dto/role";
import {Muscle} from "../interface/dto/muscle";
import {ExerciseType} from "../interface/dto/exercise-type";

export function generateTestUser(roles: Role[] = []) {
  const mockUser: User = {
    id: 1,
    email: "test@example.com",
    firstName: "John",
    lastName: "Doe",
    username: "JohnDoe",
    roles: roles,
  };
  return mockUser;
}

export function generateTestExercise(muscles: Muscle[] = [],
                                     exerciseTypes: ExerciseType[] = [],
                                     progExercises: ProgExercise[] = []) {
  const mockExercise: Exercise = {
    id: 1,
    name: "test",
    goal: "test",
    description: "test",
    muscles: muscles,
    exerciseTypes: exerciseTypes,
    progExercises: progExercises,
  };
  return mockExercise;
}

export function generateTestProgExercise(user: User, exercise: Exercise) {
  const mockProgExercise: ProgExercise = {
    id: 1,
    name: 'test',
    note: 'test',
    visibility: Visibility.PRIVATE,
    trustLabel: TrustLabel.UNVERIFIED,
    creator: user,
    exercise: exercise,
    targetSets: [],
  };
  return mockProgExercise;
}

