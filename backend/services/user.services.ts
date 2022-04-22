import User from '../models/user';

export const getUsersData = async () => {
  const users = await User.find({});
  if (!users) throw Error();
  return users;
};
export const getUserData = async (id) => {
  const user = await User.findById(id);
  if (!user) throw Error();
  return user;
};