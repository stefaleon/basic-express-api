import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const authorize = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Authorization denied' });
  }

  try {
    const verified = jwt.verify(token, process.env.SECRET);

    req.user = await User.findById(verified.id).select('-password');

    next();
  } catch (error) {
    res.status(401).json({ error: 'Authorization denied' });
  }
};

export default authorize;
