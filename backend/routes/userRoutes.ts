import express from 'express';
import {
  getAllUsers,
  loginUser,
  logoutUser,
  registerUser,
} from '../controllers/userController';
import protect from '../middleware/authMiddleware';

const router = express.Router();

router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.route('/').post(registerUser).get(protect, getAllUsers);

export default router;
