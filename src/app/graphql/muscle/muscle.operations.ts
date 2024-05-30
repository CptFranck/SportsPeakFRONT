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
      }
    }
  }
`;

export const ADD_MUSCLES = gql`
  mutation ($inputNewMuscle : InputNewMuscle!){
    addMuscle(inputNewMuscle: $inputNewMuscle) {
      id
      exercises {
        id
        name
        goal
      }
      name
      function
    }
  }
`;
