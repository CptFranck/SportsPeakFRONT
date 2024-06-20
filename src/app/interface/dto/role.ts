export interface Role {
  id: number,
  name: String,
  firstName: String,
  lastName: String,
  username: String,
  roles: [Role];
}
