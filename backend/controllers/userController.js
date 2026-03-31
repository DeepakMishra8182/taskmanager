import User from "../models/userSchema.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "all credentials required" });
    }
    const checkemail = await User.findOne({ email });
    if (checkemail) {
      return res.status(400).json({ message: "user already exists" });
    }
    const hashpassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name: name,
      email: email,
      password: hashpassword,
    });
    await newUser.save();
    return res.status(201).json({
      message: "user registered successfully",
      user: {
        name: newUser.name,
        email: newUser.email,
        id: newUser._id,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "all credentials required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = generateToken(user._id);
    return res
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
      })
      .status(200)
      .json({
        message: "login successful",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      });
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
};

export const logout = (req, res) => {
  return res
    .cookie("token", "", {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      expires: new Date(0),
    })
    .status(200)
    .json({ message: "user logout successfully" });
};

export const getProfile = async (req, res) => {
  try {
    res.status(200).json({
      user: {
        id: req.user.id
      }
    });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};