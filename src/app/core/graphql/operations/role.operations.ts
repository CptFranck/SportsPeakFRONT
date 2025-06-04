import {gql} from "apollo-angular";

export const GET_ROLES = gql`
  query {
    getRoles {
      id
      name
      privileges {
        id
        name
      }
    }
  }
`;

export const ADD_ROLE = gql`
  mutation ($inputNewRole : InputRole!){
    addRole(inputNewRole: $inputNewRole) {
      id
      name
      privileges {
        id
        name
      }
    }
  }
`;

export const MOD_ROLE = gql`
  mutation ($inputRole : InputRole!){
    modifyRole(inputRole: $inputRole) {
      id
      name
      privileges {
        id
        name
      }
    }
  }
`;

export const DEL_ROLE = gql`
  mutation ($roleId : ID!){
    deleteRole(roleId: $roleId)
  }
`;
