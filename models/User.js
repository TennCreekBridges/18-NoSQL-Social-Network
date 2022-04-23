// import required
const { Schema, model } = require('mongoose');

// generate user schema
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: 'We need your username here please and thanks.',
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      // mongoose email validation
      match: [
        /.+@.+\..+/,
        "C'mon, give us something valid. We have to know where to send your spam email.",
      ],
    },

    // reference Thought model
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    // reference User model to generate friends array
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    // virtuals & getters
    toJSON: {
      virtuals: true,
      getters: true,
    },
    // omit id
    id: false,
  }
);

// generate friend totals
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

// define user model
const User = model('User', userSchema);

// export User model
module.exports = User;
