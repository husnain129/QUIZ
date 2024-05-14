import Profile from "../models/profileModel.js";
import User from "../models/userModel.js";

export const createUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const newUser = new User({
      username,
      password,
      email,
    });

    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create user", error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to login", error: error.message });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const profile = await Profile.findOne({ userId });
    if (!profile) {
      res.status(404).json({ message: "Profile not found" });
      return;
    }
    res.status(200).json(profile);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to get user", error: error.message });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { quizIds, scores, userId } = req.body;
    const profile = await Profile.findOne({ userId });
    if (!profile) {
      res.status(404).json({ message: "Profile not found" });
      return;
    }
    const updated = await Profile.findOneAndUpdate(
      { userId },
      { quizIds, scores },
      { new: true }
    );

    res.status(200).json(updated);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update user", error: error.message });
  }
};
