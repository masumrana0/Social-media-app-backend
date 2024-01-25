import { IPost } from './post.interface';
import { PostModel } from './post.model';

const getUserPosts = async () => {
  // checking user existed
  const users = await PostModel.find();
  return users;
};

const createUserPost = async (payload:IPost) => {
  // checking user existed
  const users = await PostModel.create(payload);
  return users;
};

export const PostService = {
  getUserPosts,
  createUserPost
};


// export const createUser = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { data } = req.body
//     const user = await createUserToDB(data)
//     res.status(200).json({
//       status: 'success',
//       data: user
//     })
//   } catch (error) {
//     res.status(500).json({
//       status: 'error',
//       data: error
//     })
//   }
// }

// export const createUserToDB = async (payload: IUser): Promise<IUser> => {
//   try {
//     const user = new User(payload)
//     await user.save()
//     return user
//   } catch (error) {
//     throw error
//   }
// }