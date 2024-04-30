import express from 'express';
import { addQuestion, getQuestions, getQuestionsAll } from '../controllers/questionController.js';

const router = express.Router();

router.post('/add', addQuestion);
router.post('/get',getQuestions);
router.get('/getAll', getQuestionsAll);

export default router;