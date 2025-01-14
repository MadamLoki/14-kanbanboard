import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  // TO DO: If the user exists and the password is correct, return a JWT token
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });
  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }
  const token = jwt.sign({ username }, process.env.ACCESS_TOKEN_SECRET as string);
  res.json({ token });
  return;
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;
