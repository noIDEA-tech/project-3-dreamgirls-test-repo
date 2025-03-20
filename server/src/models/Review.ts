import { Schema, model, Document } from 'mongoose';

// Define an interface for the Thought document
interface IComment extends Document {
  commentText: string;
  createdAt: Date;
}

interface IReview extends Document {
 reviewText: string;
  reviewAuthor: string;
  createdAt: Date;
  comments: IComment[];
}

// Define the schema for the Comment subdocument
const commentSchema = new Schema<IComment>(
  {
    commentText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
  },
  {
    _id: false,
    toJSON: { getters: true },
    toObject: { getters: true },
    timestamps: true,
  }
);

// Define the schema for the Review document
const reviewSchema = new Schema<IReview>(
  {
    reviewText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
      trim: true,
    },
    reviewAuthor: {
      type: String,
      required: true,
      trim: true,
    },
    comments: [commentSchema],
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

const Review = model<IReview>('Review', reviewSchema);

export default Review;
