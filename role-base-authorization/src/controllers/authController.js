import User from "../model/userModel.js";
import bcrptjs from "bcryptjs";
import Jwt from "jsonwebtoken";
const register = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const hashedPassword = await bcrptjs.hash(password, 10);
    const newUser = new User({
      username,
      password: hashedPassword,
      role,
    });
    await newUser.save();
    res.status(201).json({
      message: `User register with username ${username}`,
    });
  } catch (error) {
    res.status(500).json({
      message: `something went wrong at creating user`,
    });
  }
};
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({
        message: `user with username ${username} not found`,
      });
    }
    const isMatch = await bcrptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = Jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({
      token,
    });
  } catch (error) {
    res.status(400).json({
      message: "something went wrong at login",
    });
  }
};

export { register, login };
