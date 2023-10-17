import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import express from 'express';

//@desc     REGISTER User & Get Token
//@route    POST api/users/register
//@access   Public

const register = asyncHandler(async (req, res) => {
  const { name,
    email,
    password,
    contactNumber,
    gender,
    userDOB,
    universityName,
    collegeName,
    courseName,
    rollNumber,
    registrationNumber,
    semester, } = req.body;
  console.log(req.body);
  console.log({ name, email, password })
  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error('User already Exist');
  }

  const user = await User.create({
    name,
    email,
    password,
    contactNumber,
    gender,
    userDOB,
    universityName,
    collegeName,
    courseName,
    rollNumber,
    registrationNumber,
    semester,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid User Data');
  }
});

//@desc     Auth User & Get Token
//@route    POST api/users/login
//@access   Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      roleId: user.roleId,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or Password');
  }
});



//@desc     Get all Users
//@route    GET api/users
//@access   Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

//@desc     Get all Users
//@route    GET api/users/getUsersBy
//@access   Private/Admin
const getUsersBy = asyncHandler(async (req, res) => {
  console.log(req.body);
  const users = await User.find(req.body);
  res.json(users);
});

//@desc     Update User Profile
//@route    PUT api/users/profile/:id
//@access   Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    return res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('User not Found');
  }
});

//@desc     REGISTER User & Get Token
//@route    DELETE api/users/deleteUser
//@access   Admin

const deleteUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    await User.deleteOne({ _id: user._id });
    res.json({});
  } else {
    res.status(404);
    throw new Error('User not Found');
  }
});

//@desc     REGISTER User & Get Token
//@route    POST api/users/registerShop
//@access   Admin

const registerShop = asyncHandler(async (req, res) => {
  const { name, email, password, shopDetails } = req.body;
  const { shopName, shopAddress } = shopDetails;
  const { zipCode } = shopAddress;
  console.log(req.body);
  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error('User already Exist');
  }

  const user = await User.create({ name, email, password, roleId: shopRoleId, shopName, zipCode });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid User Data');
  }
});


//@desc     REGISTER User & Get Token
//@route    POST api/users/registerSupport
//@access   Admin

const registerSupport = asyncHandler(async (req, res) => {
  const { name, email, password, supportDetails } = req.body;

  console.log(req.body);
  console.log({ name, email, password })
  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error('User already Exist');
  }

  const user = await User.create({ name, email, password, roleId: supportRoleId });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid User Data');
  }
});


export { login, register, getUsers, getUsersBy, updateUserProfile, deleteUserProfile, registerShop, registerSupport };
