import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });

    await newUser.save();
    res.status(200).json(newUser);
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username }); //findOne method takes the filter object as the username.
    if (!user) return next(createError(404, "User not found"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong Password or username!!"));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },// this is the signature here , that what we want to put in our payload for the token
      process.env.JWT_SECRET_KEY
    );

    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, { httpOnly: true })// we make httpOnly: true because we don't allow any client secret to access the cookie it should be http only
      .status(200)
      .json({ ...otherDetails });
  } catch (err) {
    next(err);
  }
};
