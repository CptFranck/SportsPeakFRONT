import {gql} from "apollo-angular";

export const GET_MUSCLES = gql`
  query getMus {
    getMuscles {
      id
      name
      description
      function
      exercises {
        id
        name
        goal
      }
    }
  }
`;

export const ADD_MUSCLES = gql`
  mutation ($inputNewMuscle : InputNewMuscle!){
    addMuscle(inputNewMuscle: $inputNewMuscle) {
      id
      name
      description
      function
      exercises {
        id
        name
        goal
      }
    }
  }
`;
