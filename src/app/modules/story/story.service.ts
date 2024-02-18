import { IComment_Reaction } from '../commentReaction/comment_reaction.interface';
import { profileService } from '../profile/profile.service';
import { IUserSpecificField } from '../user/user.interface';
import { IStory } from './story.interface';
import { Story } from './story.model';

// create story
const createStory = async (payload: IStory): Promise<IStory | null> => {
  const result = await Story.create(payload);
  return result;
};

// get all Story
const getAllStory = async (): Promise<IStory[] | null> => {
  const stories = await Story.find();

  if (stories.length > 0) {
    const storiesPromises = stories.map(async story => {
      if (story.user) {
        const profile = await profileService.getUserCommonData(
          story.user as unknown as string,
        );
        const updatedReaction = story.toObject();
        updatedReaction.user = profile as IUserSpecificField;
        return updatedReaction as IStory;
      }
      return story.toObject() as IStory;
    });

    const result = await Promise.all(storiesPromises);
    return result;
  }
  return [];
};

export const StoryService = {
  createStory,
  getAllStory,
};
