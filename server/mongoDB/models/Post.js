import mongoose from 'mongoose';

//schema
const postSchema = mongoose.Schema(
  {
    postedUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    text: {
      type: String,
      default: null,
      trim: true
    },
    photos: {
      type: Array,
      trim: true,
      default: Array
    },
    like: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'User'
    },
    comment: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Comment'
    },
    type: {
      type: String,
      enum: ['public', 'private', 'onlyFriend'],
      default: 'public'
    },
    status: { type: Boolean, default: true },
    trash: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

// export model

export default mongoose.model('Post', postSchema);
