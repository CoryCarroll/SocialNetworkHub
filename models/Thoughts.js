const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const DateFormat = require('../utils/dateFormat');

const thoughtsSchema = new Schema(
    {
        thoughtId: {
            type: String,
            required: true,
            maxLength: 280,
        },
        createdAt: {
          type: Date,
          default: Date.now,
          get: createdTime => DateFormat(createdTime)
        },
        username: {
          type: String,
          required: true
        },
        reactions: [
          reactionSchema
        ]
    },
    {
        toJSON: {
          virtuals: true,
        },
        id: false,
      },     
)

const Thoughts = model('Thoughts', thoughtsSchema);

module.exports = Thoughts;