import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  
  try {
    console.log('Login attempt for username:', username);
    
    const user = await User.findOne({ where: { username } });
    console.log('User found:', user ? 'Yes' : 'No');
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    
    const validPassword = await bcrypt.compare(password, user.password);
    console.log('Password valid:', validPassword ? 'Yes' : 'No');
    
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    if (!process.env.JWT_SECRET_KEY) {
      console.error('JWT_SECRET_KEY is not set!');
      return res.status(500).json({ message: 'Server configuration error' });
    }

    const token = jwt.sign(
      { 
        id: user.id, 
        username: user.username 
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '2h' }
    );
    console.log('Token generated successfully');

    res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
  return res;
};

const router = Router();
router.post('/login', login);
export default router;