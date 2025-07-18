import {User} from "../shared/model/dto/user";
import {Exercise} from "../shared/model/dto/exercise";
import {ProgExercise} from "../shared/model/dto/prog-exercise";
import {Visibility} from "../shared/model/enum/visibility";
import {TrustLabel} from "../shared/model/enum/trust-label";
import {Role} from "../shared/model/dto/role";
import {Muscle} from "../shared/model/dto/muscle";
import {ExerciseType} from "../shared/model/dto/exercise-type";
import {TargetSet} from "../shared/model/dto/target-set";
import {TargetSetState} from "../shared/model/enum/target-set-state";
import {WeightUnit} from "../shared/model/enum/weight-unit";
import {PerformanceLog} from "../shared/model/dto/performance-log";
import {Privilege} from "../shared/model/dto/privilege";

export function generateTestPrivileges(roles: Role[] = []): Privilege {
  return {
    id: 1,
    name: "name",
    roles: roles,
  };
}

export function generateTestUser(roles: Role[] = []): User {
  return {
    id: 1,
    email: "test@example.com",
    firstName: "John",
    lastName: "Doe",
    username: "JohnDoe",
    roles: roles,
  };
}

export function generateTestExerciseType(exercises: Exercise[] = []): ExerciseType {
  return {
    id: 1,
    name: "name",
    goal: "gaol",
    exercises: exercises,
  };
}

export function generateTestMuscle(exercises: Exercise[] = []): Muscle {
  return {
    id: 1,
    name: "name",
    latinName: "latinName",
    description: "description",
    function: "function",
    illustrationPath: "illustrationPath",
    exercises: exercises,
  };
}

export function generateTestExercise(muscles: Muscle[] = [],
                                     exerciseTypes: ExerciseType[] = [],
                                     progExercises: ProgExercise[] = []): Exercise {
  return {
    id: 1,
    name: "name",
    goal: "goal",
    description: "description",
    muscles: muscles,
    exerciseTypes: exerciseTypes,
    progExercises: progExercises,
  };
}

export function generateTestProgExercise(user: User, exercise: Exercise): ProgExercise {
  return {
    id: 1,
    name: 'name',
    note: 'note',
    visibility: Visibility.PRIVATE,
    trustLabel: TrustLabel.UNVERIFIED,
    creator: user,
    exercise: exercise,
    targetSets: [],
  };
}

export function generateTestTargetSet(performanceLogs: PerformanceLog[] = []): TargetSet {
  return {
    id: 0,
    index: 0,
    setNumber: 0,
    repetitionNumber: 0,
    weight: 0,
    weightUnit: WeightUnit.KILOGRAMME,
    physicalExertionUnitTime: {seconds: 0, minutes: 0, hours: 0},
    restTime: {seconds: 0, minutes: 0, hours: 0},
    creationDate: new Date().toISOString(),
    state: TargetSetState.USED,
    targetSetUpdate: null,
    performanceLogs: performanceLogs,
  };
}

export function generateTestPerformanceLog(): PerformanceLog {
  return {
    id: 0,
    setIndex: 0,
    repetitionNumber: 0,
    weight: 0,
    weightUnit: WeightUnit.KILOGRAMME,
    logDate: new Date().toISOString(),
  };
}

