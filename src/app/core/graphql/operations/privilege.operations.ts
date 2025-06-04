import {gql} from "apollo-angular";

export const GET_PRIVILEGES = gql`
  query {
    getPrivileges {
      id
      name
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
`;

export const ADD_PRIVILEGE = gql`
  mutation ($inputNewPrivilege : InputNewPrivilege!){
    addPrivilege(inputNewPrivilege: $inputNewPrivilege) {
      id
      name
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
`;

export const MOD_PRIVILEGE = gql`
  mutation ($inputPrivilege : InputPrivilege!){
    modifyPrivilege(inputPrivilege: $inputPrivilege) {
      id
      name
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
`;

export const DEL_PRIVILEGE = gql`
  mutation ($privilegeId : ID!){
    deletePrivilege(privilegeId: $privilegeId)
  }
`;
