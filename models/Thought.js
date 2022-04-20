// dependencies
const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// thoughtSchema
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: 'You gotta enter a thought.',
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    username: {
      type: String,
      required: 'We have to know your username.',
    },
    // get reactionSchema
    reactions: reactionSchema,
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
// generate reaction schema
const reactionSchema = new Schema(
  {
    // custom reaction id
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: 'No really. We really wanna hear what you have to say.',
      minlength: 1,
      maxlength: 280,
      trim: true,
    },
    username: {
      type: String,
      required: 'Gotta know your username. Please enter it here.',
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
  },
  {
    // plus some getters
    toJSON: {
      getters: true,
    },
  }
);

// get reactions to thoughts
ThoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

// define thought model
const Thought = model('Thought', thoughtSchema);

// export thought model
module.exports = Thought;