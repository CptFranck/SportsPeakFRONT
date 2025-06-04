import {User} from "../shared/model/dto/user";
import {Exercise} from "../shared/model/dto/exercise";
import {ProgExercise} from "../shared/model/dto/prog-exercise";
import {VisibilityEnum} from "../shared/model/enum/visibility.enum";
import {TrustLabelEnum} from "../shared/model/enum/trustLabel.enum";
import {Role} from "../shared/model/dto/role";
import {Muscle} from "../shared/model/dto/muscle";
import {ExerciseType} from "../shared/model/dto/exercise-type";
import {TargetSet} from "../shared/model/dto/target-set";
import {TargetSetStateEnum} from "../shared/model/enum/targetSetState.enum";
import {WeightUnitEnum} from "../shared/model/enum/weightUnit.enum";
import {PerformanceLog} from "../shared/model/dto/performance-log";

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
    visibility: VisibilityEnum.PRIVATE,
    trustLabel: TrustLabelEnum.UNVERIFIED,
    creator: user,
    exercise: exercise,
    targetSets: [],
  };
  return mockProgExercise;
}

export function generateTestTargetSet(performanceLogs: PerformanceLog[] = []) {
  const mockTargetSet: TargetSet = {
    id: 0,
    index: 0,
    setNumber: 0,
    repetitionNumber: 0,
    weight: 0,
    weightUnit: WeightUnitEnum.KILOGRAMME,
    physicalExertionUnitTime: {seconds: 0, minutes: 0, hours: 0},
    restTime: {seconds: 0, minutes: 0, hours: 0},
    creationDate: new Date().toISOString(),
    state: TargetSetStateEnum.USED,
    targetSetUpdate: null,
    performanceLogs: performanceLogs,
  };
  return mockTargetSet;
}

export function generateTestPerformanceLog() {
  const mockPerformanceLog: PerformanceLog = {
    id: 0,
    setIndex: 0,
    repetitionNumber: 0,
    weight: 0,
    weightUnit: WeightUnitEnum.KILOGRAMME,
    logDate: new Date().toISOString(),
  };
  return mockPerformanceLog;
}

