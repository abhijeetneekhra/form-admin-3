const userModel = require("../models/userModel");
var nodemailer = require("nodemailer");
const fs = require("fs");
const handlebars = require("handlebars");
//const bcrypt = require("bcrypt");
//create user register user
exports.registerController = async (req, res) => {
  try {
    const {
      firstname,
      middlename,
      lastname,
      course,
      gender,
      phone,
      currentAddress,
      email,
      password,
      reTypePassword,
    } = req.body;
    //validation
    if (
      !firstname ||
      !lastname ||
      !course ||
      !gender ||
      !phone ||
      !currentAddress ||
      !email ||
      !password ||
      !reTypePassword
    ) {
      return res.status(400).send({
        success: false,
        message: "Please Fill all fields",
      });
    }
    //exisiting user
    const exisitingUser = await userModel.findOne({ email });
    if (exisitingUser) {
      return res.status(401).send({
        success: false,
        message: "user already exists",
      });
    }
    //const hashedPassword = await bcrypt.hash(password, 10);

    //save new user
    const user = new userModel({
      firstname,
      middlename,
      lastname,
      course,
      gender,
      phone,
      currentAddress,
      email,
      password,
      reTypePassword,
    });
    await user.save();

    const filePath =
      "C:\\Users\\ABHIJEET\\Documents\\Mern Stack\\projects 7\\form-admin\\EmailTemplate.html";
    const source = fs.readFileSync(filePath, "utf-8").toString();
    const template = handlebars.compile(source);
    const replacements = {
      registrationID: user._id,
      name: user.firstname + " " + user.middlename + " " + user.lastname,
      course: user.course,
      gender: user.gender,
      phone: user.phone,
      currentAddress: user.currentAddress,
      email: user.email,
      createdAt: user.createdAt,
    };
    const htmlToSend = template(replacements);

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "neekhraabhijeet1989@gmail.com",
        pass: "npjibjowznfnxmty",
      },
    });

    var mailOptions = {
      from: "neekhraabhijeet1989@gmail.com",
      to: user.email,
      subject: "Student registration successful",
      html: htmlToSend,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    return res.status(201).send({
      success: true,
      message: "New User Created",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error In Register callback",
      success: false,
      error,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id, course, gender, currentAddress } = req.body;

    //validation
    if (!id || !course || !gender || !currentAddress) {
      return res.status(400).send({
        success: false,
        message: "Please supply all fields",
      });
    }

    //update the user
    const updatedRecord = await userModel.findByIdAndUpdate(id, {
      course: course,
      gender: gender,
      currentAddress: currentAddress,
    });
    return res.status(201).send({
      success: true,
      message: "User Updated",
      updatedRecord,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error In updating user",
      success: false,
      error,
    });
  }
};

// get all users
exports.getAllUsers = async (req, res) => {
  try {
    console.log("get all users called");
    const users = await userModel
      .find({ isDeleted: false })
      .select("-password -reTypePassword");
    return res.status(200).send({
      userCount: users.length,
      success: true,
      message: "all users data",
      users,
    });
    console.log(users);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Get ALl Users",
      error,
    });
  }
};

// get user with id
exports.getUser = async (req, res) => {
  try {
    console.log("get user called");
    const users = await userModel
      .find({ _id: req.params.id })
      .select("-password -reTypePassword");
    return res.status(200).send({
      userCount: users.length,
      success: true,
      message: "user data with id",
      users,
    });
    console.log(users);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Get ALl Users",
      error,
    });
  }
};

// get all deleted users
exports.getAllDeletedUsers = async (req, res) => {
  try {
    console.log("get all deleted users called");
    const users = await userModel
      .find({ isDeleted: true })
      .select("-password -reTypePassword");
    return res.status(200).send({
      userCount: users.length,
      success: true,
      message: "all deleted users data",
      users,
    });
    console.log(users);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Get ALl Deleted Users",
      error,
    });
  }
};

//Delete Blog
exports.deleteUserController = async (req, res) => {
  try {
    const filter = { _id: req.params.id };
    const update = { isDeleted: true };

    const result = await userModel.findOneAndUpdate(filter, update);
    if (!result) {
      return res.status(404).send({ error: "user not found !" });
    } else {
      return res.status(200).send({
        success: true,
        message: "User Deleted!" + req.params.id,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Erorr WHile Deleteing BLog",
      error,
    });
  }
};

exports.undoDeleteUserController = async (req, res) => {
  try {
    const filter = { _id: req.params.id };
    const update = { isDeleted: false };

    const result = await userModel.findOneAndUpdate(filter, update);
    if (!result) {
      return res.status(404).send({ error: "user not found !" });
    } else {
      return res.status(200).send({
        success: true,
        message: "User Undeleted!" + req.params.id,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Erorr WHile Deleteing BLog",
      error,
    });
  }
};
