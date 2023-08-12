const express = require("express");
const {
  loginController,
  adminRegisterController,
  getAllAdmins,
  changePassword,
  sendmail,
} = require("../controllers/adminController");
const userAuth = require("../middlewares/authMiddlewares");

const router = express.Router();

// CREATE USER || POST
//router.post("/register", adminRegisterController);

// GET ALL USERS || GET
router.get("/all-users", userAuth, getAllAdmins);

//LOGIN || POST
router.post("/login", loginController);

// Change Password || POST
router.post("/changepassword", userAuth, changePassword);

//send mail || POST
router.post("/sendmail", userAuth, sendmail);

module.exports = router;
