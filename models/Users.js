const { Schema, model } = require('mongoose');
const thoughtsSchema = require('./Thoughts');
const friendsSchema = require ('./Friends');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            // trimmed: What do we put here?
        },
        email: {
            type: String,
            unique: true,
            required: true,
            validate: [validateEmail],
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
        },
        thoughts: [
            {
              type: Schema.Types.ObjectId,
              ref: 'thoughts',
            },
          ],
          friends: [
            {
              type: Schema.Types.ObjectId,
              ref: 'User'
            }
          ]
    },
    {
        toJSON: {
          getters: true,
          virtuals: true,
        },
        id: false,
      },     
)

userSchema
  .virtual('friendCount')
  .get(function () {
    return this.friends.length;
  });

const user = model('users', userSchema);

module.export = user;