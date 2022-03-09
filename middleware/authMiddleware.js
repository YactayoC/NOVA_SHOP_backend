import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const checkAuth = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password -token -confirmed");
            return next();
        } catch (e) {
            const error = new Error('Invalid token');
            restart.status(403).json({ msg: error.message });
        }
    }

    if (!token) {
        const error = new Error('Invalid token or token does not exist');
        res.status(404).json({ msg: error.message });
    }
}

export default checkAuth;