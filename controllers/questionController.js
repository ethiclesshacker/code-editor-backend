import Question from '../models/questionModel.js';
import asyncHandler from 'express-async-handler';
import express from 'express';

//@desc     Get all Questions
//@route    GET api/questions/getAll
//@access   Admin
const addQuestion = asyncHandler(async (req, res) => {
    // console.log(req);
    const {questionString, testCases, tags } = req.body;
    const question = Question.create({questionString, testCases, tags});
    if (question) {
        res.status(201).json({
          _id: question._id,
          questionString: question.questionString,
        });
      } else {
        res.status(400);
        throw new Error('Invalid Question Data');
      }
  });


//@desc     Get all Questions
//@route    GET api/questions/getAll
//@access   Admin
const getQuestionsAll = asyncHandler(async (req, res) => {
    const questions = await Question.find({});
    res.json(questions);
  });

//@desc     Get all Questions
//@route    GET api/questions/find
//@access   Private/User
const getQuestions = asyncHandler(async (req, res) => {
    const questions = await Question.find(req.body);
    res.json(questions);
  });

export {addQuestion, getQuestions, getQuestionsAll};