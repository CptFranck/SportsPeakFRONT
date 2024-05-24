import {gql} from 'apollo-angular';

const GET_EXERCISES = gql`
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

const GET_MUSCLES = gql`
  query getMus {
    getMuscles {
      id
      name
      description
      function
      exercises {
        id
        name
      }
    }
  }
`;

const GET_EXERCISETYPES = gql`
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

export {GET_EXERCISES, GET_MUSCLES, GET_EXERCISETYPES};
