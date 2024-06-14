import {gql} from "apollo-angular";

export const LOGIN = gql`
  query ($inputCredentials: InputCredentials!){
    login(inputCredentials: $inputCredentials){
      id
      email
      firstName
      lastName
      username
      token
    }
  }`;

export const REGISTER = gql`
  mutation ($inputNewUser : InputNewUser!) {
    register(inputNewUser: $inputNewUser){
      id
      email
      firstName
      lastName
      username
      token
    }
  }`;
