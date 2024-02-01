import { IPost } from './post.interface';
import { Post } from './post.model';

// Submited post
const submitPost = async (payload: IPost): Promise<IPost | null> => {
  const result = await Post.create(payload);
  return result;
};

// get All post
const getAllPost = async (): Promise<IPost[] | null> => {
  const result = await Post.find({});
  return result;
};

// getSinglePost
const getSinglePost = async (postId: string): Promise<IPost | null> => {
  const result = await Post.findById(postId);
  return result;
};

export const postService = {
  submitPost,
  getAllPost,
  getSinglePost,
};
