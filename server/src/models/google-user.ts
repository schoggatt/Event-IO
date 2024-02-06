export interface IGoogleUser {
  email: string;
  image?: string;
  firstName: string;
  lastName: string;
}

export class GoogleUserModel implements IGoogleUser {
  email: string;
  image?: string;
  firstName: string;
  lastName: string;

  constructor(user: IGoogleUser) {
    this.email = user.email;
    this.image = user.image;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
  }
}
