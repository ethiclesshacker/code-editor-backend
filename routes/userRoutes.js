import express from 'express';
import {
  getUsers,
  getUsersBy,
  login,
  register,
  updateUserProfile,
  deleteUserProfile,
  registerShop,
  registerSupport,
} from '../controllers/userController.js';
import { admin, protect } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/', protect, admin, getUsers);
router.post('/getUsersBy', getUsersBy);
router.put('/', protect, updateUserProfile);
router.delete('/', protect, admin, deleteUserProfile);
router.post('/registerShop', protect, admin, registerShop);
router.post('/registerSupport', protect, admin, registerSupport);
export default router;
