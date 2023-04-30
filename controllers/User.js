import User from "../models/User.js";

export const Login = async (req, res) => {
  try {
    const { email, password } = req?.body;
    if (!email || !password) {
      return res.status(401).json({
        message: "All data is required",
      });
    }
    const LoginUser = await User.findOne({ email }).select("-password");

    return res.status(200).json(LoginUser);
  } catch (error) {
    res.status(404).json({ message: error?.message });
  }
};

export const Signup = async (req, res) => {
  try {
    const { name, email, password, role } = req?.body;
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res.status(401).json({ message: "User already exist" });
    } else {
      const newUser = await User.create({ email, password, name, role });
      return res.status(200).json(newUser);
    }
  } catch (error) {
    res.status(404).json({ message: error?.message });
  }
};
