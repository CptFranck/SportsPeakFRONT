import {gql} from "apollo-angular";

export const GET_EXERCISES = gql`
  query GetExercises {
    getExercises {
      id
      name
      description
      goal
      muscles {
        id
        name
        description
        function
      }
      exerciseTypes {
        id
        name
        goal
      }
    }
  }
`;
