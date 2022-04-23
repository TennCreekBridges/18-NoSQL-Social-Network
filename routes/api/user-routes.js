// required
const router = require('express').Router();

// User routes
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/user-controller');

// api users
router.route('/').get(getAllUsers).post(createUser);

// api user by :id
router.route('/:userId').get(getUserById).put(updateUser).delete(deleteUser);

// api user:id/friends/friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

// export user routes
module.exports = router;
