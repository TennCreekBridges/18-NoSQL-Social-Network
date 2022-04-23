// import models
const { Thought, User } = require('../models');

// set User controller
const userController = {
  // get all users
  getAllUsers(req, res) {
    User.find()
      .select('-__v')
      // sort results descending
      .sort({ _id: -1 })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // get one User by id
  getUserById({ params }, res) {
    User.findOne({ _id: req.params.id })
      .populate({
        path: 'thought',
        select: '-__v',
      })
      .populate ('friends')
      .select('-__v')
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No Users found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // create User
  createUser({ body }, res) {
    User.create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(400).json(err));
  },

  // update User by id
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No User found with this ID.' });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // delete User
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.userId }).then((deletedUserData) => {
      if (!deletedUserData) {
        res.status(404).json({ message: 'No User found with this ID.' });
        return;
      }

      Thought.deleteMany({ username: deletedUserData.username })
        .then(
          res.json({
            message: 'User and associated thoughts deleted successfully!',
          })
        )
        .catch((err) => res.status(400).json(err));
    });
  },

  // add friend
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $push: { friends: params.friendId } },
      { new: true }
    ).then((data) => res.json(data));
  },

  // remove friend
  removeFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    ).then((data) => res.json(data));
  },
};

// export User Controller
module.exports = userController;
