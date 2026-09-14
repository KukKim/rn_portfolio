export interface RequestSignUp {
  email?: string;
  name?: string;
  password?: string;
  accountType: "EMAIL" | "GUEST";
}

export interface RequestSignIn {
  email: string;
  password: string;
}

export interface RequestCheckToken {
  token: string;
}

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
