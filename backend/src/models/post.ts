import mongoose, { Document, Schema } from 'mongoose';

interface IPost extends Document {
  userId: string;
  title: string;
  content: string;
  timestamp: Date;
}

const postSchema: Schema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model<IPost>('Post', postSchema);

export default Post;
