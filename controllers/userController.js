import User from "../models/User.js";
import Product from "../models/Product.js";

import generateJWT from "../helpers/generateJWT.js";
import generateToken from "../helpers/generateToken.js";

import emailRegister from "../helpers/emailRegister.js";
import emailForgetPassword from "../helpers/emailForgetPassword.js";

const register = async (req, res) => {
  const { name, lastname, email } = req.body;

  const userExist = await User.findOne({ email: email });
  if (userExist) {
    const error = new Error("Existing user");
    return res.status(400).json({ msg: error.message });
  }

  try {
    const user = new User(req.body);
    const userSaved = await user.save();

    emailRegister({
      email,
      name,
      lastname,
      token: userSaved.token,
    });

    res.json({ msg: "Successfully registered, please check your email" });
  } catch (err) {
    console.log(err.message);
  }
};

const confirmToken = async (req, res) => {
  const { token } = req.params;
  const confirmUser = await User.findOne({ token: token });

  if (!confirmUser) {
    const error = new Error("Invalid token");
    return res.status(404).json({ msg: error.message });
  }

  try {
    confirmUser.token = null;
    confirmUser.confirmed = true;

    await confirmUser.save();

    res.json({ msg: "User successfully confirmed" });
  } catch (error) {
    console.log(error.message);
  }
};

const authenticate = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });
  if (!user) {
    const error = new Error("The user does not exist");
    return res.status(403).json({ msg: error.message });
  }

  if (!user.confirmed) {
    const error = new Error("The user is not confirmed");
    return res.status(403).json({ msg: error.message });
  }

  if (await user.checkPassword(password)) {
    // We register the JWT, and the checkaout looks for it and saves it in the server and the frontend looks for it through the res.json
    res.json({
      _id: user._id,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      phone: user.phone,
      token: generateJWT(user._id),
    });
  } else {
    const error = new Error("The password is incorrect");
    return res.status(403).json({ msg: error.message });
  }
};

const forgetPassword = async (req, res) => {
  const { email } = req.body;

  const userExist = await User.findOne({ email: email });
  if (!userExist) {
    const error = new Error("User does not exist");
    res.status(404).json({ msg: error.message });
  }

  try {
    userExist.token = generateToken();
    await userExist.save();

    emailForgetPassword({
      email,
      name: userExist.name,
      lastname: userExist.lastname,
      token: userExist.token,
    });

    res.json({ msg: "We have sent an email with instructions" });
  } catch (error) {
    console.log(error);
  }
};

const checkToken = async (req, res) => {
  const { token } = req.params;
  const tokenValid = await User.findOne({ token: token });

  if (tokenValid) {
    res.json({ msg: "Token valid and user exists" });
  } else {
    const error = new Error("Invalid token");
    return res.status(404).json({ msg: error.message });
  }
};

const newPassword = async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;

  const user = await User.findOne({ token: token });

  if (!user) {
    const error = new Error("There was an error");
    return res.status(404).json({ msg: error.message });
  }

  try {
    user.token = null;
    user.password = password;
    await user.save();
    res.json({ msg: "Pasword modified correctly" });
  } catch (error) {
    console.log(error);
  }
};

const showProductsH = async (req, res) => {
  const products = await Product.find().sort({ $natural: -1 }).limit(5);
  res.json(products);
};

const showProductsP = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

const cart = async (req, res) => {
  const { district } = req.body;
  const id = req.params.id;
  const userExist = await User.findOne({ _id: id });

  if (!userExist) {
    const error = new Error("There was an error");
    return res.status(404).json({ msg: error.message });
  }

  try {
    userExist.district = district;
    await userExist.save();
  } catch (error) {
    console.log(error);
  }
};

const profile = async (req, res) => {
  const { user } = req;
  res.json(user);
};

const updateUser = async (req, res) => {
  const { id } = req.user;
  const { name, lastname, phone, password, newPassword } = req.body;

  const userExist = await User.findById(id);
  if (!userExist) {
    const error = new Error("There was an error");
    return res.status(400).json({ msg: error.message });
  }

  try {
    if (await userExist.checkPassword(password)) {
      userExist.name = name;
      userExist.lastname = lastname;
      userExist.phone = phone;
      userExist.password = newPassword;
      await userExist.save();
      return res.json({ msg: "Correctly modified data" });
    } else {
      const error = new Error("Current Password is Incorrect");
      return res.status(400).json({ msg: error.message });
    }
  } catch (error) {
    console.log(error);
  }
};

export {
  register,
  confirmToken,
  authenticate,
  forgetPassword,
  checkToken,
  newPassword,
  showProductsH,
  showProductsP,
  cart,
  profile,
  updateUser,
};
