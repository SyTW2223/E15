import { Schema, model } from 'mongoose';
import { CommentsModel} from '../Interface/commentsInterface'


export const commentsSchema = new Schema<CommentsModel>({
  username: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
})

export const Comment = model<CommentsModel>('Comment', commentsSchema);
