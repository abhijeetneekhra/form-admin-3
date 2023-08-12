const adminModel = require("../models/adminModel");
const bcrypt = require("bcrypt");
var nodemailer = require("nodemailer");
const fs = require("fs");
const handlebars = require("handlebars");
const JWT = require("jsonwebtoken");

//create user register user
exports.adminRegisterController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    //validation
    if (!username || !email || !password) {
      return res.status(400).send({
        success: false,
        message: "Please Fill all fields",
      });
    }
    //exisiting user
    const exisitingUser = await adminModel.findOne({ email });
    if (exisitingUser) {
      return res.status(401).send({
        success: false,
        message: "user already exisits",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    //save new user
    const user = new adminModel({ username, email, password: hashedPassword });
    await user.save();

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

// get all users
exports.getAllAdmins = async (req, res) => {
  try {
    const users = await adminModel.find({});
    return res.status(200).send({
      userCount: users.length,
      success: true,
      message: "all users data",
      users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Get ALl Users",
      error,
    });
  }
};

//login
exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(401).send({
        success: false,
        message: "Please provide email or password",
      });
    }
    const user = await adminModel.findOne({ email });
    if (!user) {
      return res.status(200).send({
        success: false,
        message: "email is not registerd",
      });
    }
    //password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Invlid username or password",
      });
    }

    const token = JWT.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(200).send({
      success: true,
      messgae: "login successfully",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Login Callcback",
      error,
    });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { email, currentpassword, newpassword } = req.body;

    //validation
    if (!email || !currentpassword || !newpassword) {
      return res.status(400).send({
        success: false,
        message: "Please supply all fields",
      });
    }

    //exisiting user
    const existingUser = await adminModel.findOne({ email });
    if (!existingUser) {
      return res.status(401).send({
        success: false,
        message: "Error: Invalid user",
      });
    }

    //password
    const isMatch = await bcrypt.compare(
      currentpassword,
      existingUser.password
    );
    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Invlid username or password",
      });
    }

    const hashedPassword = await bcrypt.hash(newpassword, 10);

    const updatedRecord = await adminModel.findByIdAndUpdate(existingUser._id, {
      password: hashedPassword,
    });

    return res.status(201).send({
      success: true,
      message: "Password changed successfully",
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

exports.sendmail = async (req, res) => {
  try {
    const { name, email, link } = req.body;

    //validation
    if (!name || !email || !link) {
      return res.status(400).send({
        success: false,
        message: "Please supply all fields",
      });
    }

    const filePath =
      "C:\\Users\\ABHIJEET\\Documents\\Mern Stack\\projects 7\\form-admin\\Passwordchangeemail.html";

    const source = fs.readFileSync(filePath, "utf-8").toString();
    const template = handlebars.compile(source);
    const replacements = {
      name: name,
      link: link,
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
      to: email,
      subject: "Change Password",
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
      message: "mail send successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error In sending email",
      success: false,
      error,
    });
  }
};
