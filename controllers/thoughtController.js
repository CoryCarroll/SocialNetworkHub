const { Thought, Reaction } = require('../models');

const thoughtController = {
    // getting all thoughts
    getThoughts(req, res) {
        Thought.find()
            .select('-__v')
            .then((dbThoughtData) => {
                res.json(dbThoughtData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // getting single thought by id
    getSingleThought(req, res) {
        Thought.findOne({
                _id: req.params.thoughtId
            })
            .select('-__v')
            .populate('reactions')
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                    return res.status(400).json({
                        message: 'There is no thought with this ID!'
                    });
                }
                res.json(dbThoughtData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // create new thought
    createThought({
        body
    }, res) {
        Thought.create(body)
            .then((dbThoughtData) => {
                res.json(dbThoughtData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // update existing thought
    updateThought(req, res) {
        Thought.findOneAndUpdate({
                _id: req.params.thoughtId
            }, req.body)
            .then(
                res.json('Thought successfully updated')
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // delete a thought
    removeThought(req, res) {
        Thought.deleteOne({
                _id: req.params.thoughtId
            })
            .then(
                res.json('Thought successfully deleted!')
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // add a reaction
    createReaction(req, res) {
        Thought.findOneAndUpdate({
                _id: req.params.thoughtId
            }, {
                $push: {
                    reactions: req.body
                }
            }, {
                new: true
            })
            .then(
                res.json('Reaction was successfully created!')
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // remove a reaction
    removeReaction(req, res) {
        Thought.findOneAndUpdate({
                _id: req.params.thoughtId
            }, {
                $pull: {
                    reactions: {
                        reactionId: req.params.reactionId
                    }
                }
            },
            {
                runValidators: true, new: true
            })
            .then(
                res.json('Reaction successfully deleted!')
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
}

module.exports = thoughtController;