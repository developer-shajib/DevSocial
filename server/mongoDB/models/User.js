import mongoose from 'mongoose';

// User Schema
const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },

    password: {
      type: String,
      required: true,
      trim: true
    },
    followers: { type: [mongoose.Schema.Types.ObjectId], ref: 'User' },
    following: { type: [mongoose.Schema.Types.ObjectId], ref: 'User' },

    photo: {
      type: String,
      default: null,
      trim: true
    },
    cover: { type: String, default: null, trim: true },
    isVerified: {
      type: Boolean,
      default: false
    },

    token: {
      type: String,
      default: null
    },
    status: {
      type: Boolean,
      default: true
    },
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
export default mongoose.model('User', userSchema);
