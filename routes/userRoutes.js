const express = require("express");
const {
  registerController,
  getAllUsers,
  deleteUserController,
  undoDeleteUserController,
  getAllDeletedUsers,
  getUser,
  updateUser,
} = require("../controllers/userController");
const userAuth = require("../middlewares/authMiddlewares");

//router object
const router = express.Router();

// CREATE USER || POST
router.post("/register", registerController);

// Update USER || POST
router.post("/updateUser", userAuth, updateUser);

// GET ALL USERS || GET
router.get("/all-users", userAuth, getAllUsers);

// GET USER || GET
router.get("/get-user/:id", userAuth, getUser);

// GET ALL Deleted USERS || GET
router.get("/all-deleted-users", userAuth, getAllDeletedUsers);

//Delete a user || Delete
router.delete("/delete-user/:id", userAuth, deleteUserController);

//Unod delete a user || PUT
router.put("/undelete-user/:id", userAuth, undoDeleteUserController);

module.exports = router;
