export interface UserModel {
  name: string;
  surname: string;
  birthday: Date;
  cf: string;
  email: string;
  address: string;
  zipCode: number;
  city: string;
  passwordHash: number;
  passwordSalt: number;
}
