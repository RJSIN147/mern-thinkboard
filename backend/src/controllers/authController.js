import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const signToken = (user) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET not configured");
  return jwt.sign({ id: user._id, email: user.email }, secret, {
    expiresIn: "7d",
  });
};

export async function register(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(409).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashed });

    const token = signToken(user);
    res.status(201).json({ token, user: { id: user._id, email: user.email } });
  } catch (error) {
    console.error("Error in register", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: "Invalid credentials" });

    const token = signToken(user);
    res.status(200).json({ token, user: { id: user._id, email: user.email } });
  } catch (error) {
    console.error("Error in login", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
