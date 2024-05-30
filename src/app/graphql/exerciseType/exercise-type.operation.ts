import {gql} from "apollo-angular";

export const GET_EXERCISE_TYPES = gql`
  query getExType {
    getExerciseTypes {
      id
      name
      goal
      exercises {
        id
        name
      }
    }
  }
`;

