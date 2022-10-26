const { Schema, model } = require('mongoose');

const thoughtsSchema = new Schema(
    {
        thoughtText: {
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

const thoughts = model('users', thoughtsSchema);

module.export = thoughts;