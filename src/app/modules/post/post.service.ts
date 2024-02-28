import { profileService } from '../profile/profile.service';
import { IUserSpecificField } from '../user/user.interface';
import { IPost } from './post.interface';
import { Post } from './post.model';

// Submited post
const submitPost = async (payload: IPost): Promise<IPost | null> => {
  const result = await Post.create(payload);
  return result;
};

// get All post
const getAllPost = async (): Promise<IPost[] | null> => {
  const allPost = await Post.find({}).sort({ createdAt: -1 });
  if (allPost?.length > 0) {
    const postPromises = allPost.map(async post => {
      const profile = await profileService.getUserCommonData(
        post?.user as unknown as string,
      );

      const updatedPost = post.toObject();
      updatedPost.user = profile as IUserSpecificField;
      return updatedPost as IPost;
    });

    const result = await Promise.all(postPromises);
    return result;
  }

  return [];
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
