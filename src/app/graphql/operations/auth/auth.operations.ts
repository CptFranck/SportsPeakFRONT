import {gql} from "apollo-angular";

export const LOGIN = gql`
  query ($inputCredentials: InputCredentials!){
    login(inputCredentials: $inputCredentials){
      tokenType
      accessToken
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
      }
    }
  }`;

export const REGISTER = gql`
  mutation ($inputNewUser : InputNewUser!) {
    register(inputNewUser: $inputNewUser){
      tokenType
      accessToken
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
      }
    }
  }`;
