export interface Auth {
  id: string;
  accountType?: "GUEST" | "EMAIL";
  email?: string;
  name?: string;
  imgUri?: string;
  password?: string;
  token?: string;
  loginDate?: Date;
  photoUri?: string;
}
