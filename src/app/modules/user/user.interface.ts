type IName = {
  firstName: string;
  lastName: string;
};

export type IUser = {
  userName?: string;
  name: IName;
  email: string;
  phoneNumber: string;
  password?: string;
};
