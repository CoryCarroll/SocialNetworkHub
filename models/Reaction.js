const { Schema, Types } = require('mongoose');
const DateFormat = require('../utils/dateFormat');

const reactionsSchema = new Schema(
  {
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
      },
      
    reactionBody: {
        type: String,
        required: true,
        max: 280,
      },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdTime => DateFormat(createdTime),
    },

  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = reactionsSchema;