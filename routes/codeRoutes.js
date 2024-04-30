import express from 'express';
import {
  runCode,
  testCode
} from '../controllers/codeController.js';

const router = express.Router();

router.post('/run', runCode);
router.post('/test', testCode);
export default router;
