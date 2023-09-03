import mongoose from 'mongoose';

//schema
const commentSchema = mongoose.Schema(
  {
    commentedUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post'
    },

    text: {
      type: String,
      required: true,
      trim: true
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

export default mongoose.model('Comment', commentSchema);
