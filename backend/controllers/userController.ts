import asyncHandler from '../middleware/asyncHandler';
import generateToken from '../utils/generateToken';
import User from '../models/userModel';
import { Request, Response } from 'express';

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).send('User not registered');
  }

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id as string);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id as string);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Logout user
// @route   POST /api/users/logout
// @access  Private

const logoutUser = asyncHandler(async (req: Request, res: Response) => {
  res.clearCookie('jwt');
  res.status(200).json({ message: 'Logged out successfully' });
});

const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await User.find({});
  res.json(users);
});

export { loginUser, registerUser, logoutUser, getAllUsers };
