const {User, Thought} = require('../models');

const userController = {
    // getting all users
    getUsers(req, res) {
        User.find({})
            .select('-__v')
            .then((dbUserData) => {
                res.json(dbUserData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // getting single user by id
    getSingleUser(req, res) {
        User.findOne({
                _id: req.params.userId
            })
            .select('-__v')
            .populate('friends')
            .populate('thoughts')
            .then((dbUserData) => {
                if (!dbUserData) {
                    return res.status(400).json({
                        message: 'There is no user with this ID!'
                    });
                }
                res.json(dbUserData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // create new user
    createUser({
        body
    }, res) {
        User.create(body)
            .then((dbUserData) => {
                res.json(dbUserData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // update existing user
    updateUser(req, res) {
        User.findOneAndUpdate({
                _id: req.params.userId
            }, req.body)
            .then(
                res.json('User successfully updated!')
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // delete a user
    deleteUser(req, res) {
        User.deleteOne({
                _id: req.params.userId
            })
            .then(
                res.json('User successfully deleted!')
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // add a friend to user
    addFriend(req, res) {
        User.findOneAndUpdate({
                _id: req.params.userId
            }, {
                $push: {
                    friends: req.params.friendId
                }
            }, {
                new: true
            })
            .then((dbUserData) => {
                res.json(dbUserData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // remove a friend from user
    removeFriend(req, res) {
        User.findOneAndUpdate({
                _id: req.params.userId
            }, {
                $pull: {
                    friends: req.params.friendId
                }
            })
            .then(
                res.json('Friend successfully removed!')
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
}

module.exports = userController;