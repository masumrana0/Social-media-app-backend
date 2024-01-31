import { IName } from '../app/modules/user/user.interface';

const generateUniqeAccountUserName = (name: IName): string => {
  let proposedName;
  if (name?.firstName && name?.lastName) {
    proposedName = name.firstName + name.lastName;
  }
  proposedName = name?.firstName;

  const userName = proposedName + Math.floor(Math.random() * 100 + 1);
  return userName;
};

export default generateUniqeAccountUserName;
