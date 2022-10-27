const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true 
        },
        email: {
            type: String,
            unique: true,
            lowercase: true,
            required: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
        },
        thoughts: [
            {
              type: Schema.Types.ObjectId,
              ref: 'Thoughts',
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

const User = model('Users', userSchema);

module.export = User;