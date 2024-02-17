import { IStory } from './story.interface';
import { Story } from './story.model';

const createStory = async (payload: IStory): Promise<IStory | null> => {
  const result = await Story.create(payload);
  return result;
};

const getAllStory = async (): Promise<IStory[] | null> => {
  const result = await Story.find();
  return result;
};

export const StoryService = {
  createStory,
  getAllStory,
};
