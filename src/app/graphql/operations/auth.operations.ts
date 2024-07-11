import {gql} from "apollo-angular";

export const LOGIN = gql`
  mutation ($inputCredentials: InputCredentials!){
    login(inputCredentials: $inputCredentials){
      tokenType
      accessToken
      expiration
      user {
        id
        email
        firstName
        lastName
        username
        roles {
          id
          name
          privileges {
            id
            name
          }
        }
        progExercisesCreated {
          id
          name
        }
        subscribedProgExercises {
          id
          name
        }
      }
    }
  }`;

export const REGISTER = gql`
  mutation ($inputRegisterNewUser : InputRegisterNewUser!) {
    register(inputRegisterNewUser: $inputRegisterNewUser){
      tokenType
      accessToken
      expiration
      user {
        id
        email
        firstName
        lastName
        username
        roles {
          id
          name
          privileges {
            id
            name
          }
        }
        progExercisesCreated {
          id
          name
        }
        subscribedProgExercises {
          id
          name
        }
      }
    }
  }`;
