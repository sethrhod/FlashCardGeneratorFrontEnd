export default class User {
  id: string;
  email: string;
  userName: string;
  firstName?: string;
  lastName?: string;
  refreshToken?: string;

  constructor(id: string, email: string, userName: string, firstName?: string, lastName?: string, refreshToken?: string) {
    this.id = id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = userName;
    this.refreshToken = refreshToken;
  }
}