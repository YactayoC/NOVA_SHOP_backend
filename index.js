import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import multer from "multer";

import connectDB from './config/db.js';
import employeeRoutes from './routes/employeeRoutes.js';
import userRoutes from './routes/userRoutes.js';


const app = express();
app.use(express.json());

dotenv.config();

connectDB();

// CORS
// const domainsAllowed = [process.env.FRONTEND_URL];
// const corsOptions = {
//     origin: function(origin, callback) {
//         if(domainsAllowed.indexOf(origin) !== -1) {
//             callback(null, true);
//         } else {
//             callback(new Error('Not allowed by CORS'))
//         }
//     }
// }

// app.use(cors(corsOptions));


// Routes
app.use('/api/employees', employeeRoutes);
app.use('/api/user', userRoutes);


// Images
// app.use(multer({dest: path.join(__dirname, './public/img/uploads')}).single('image'));

// Settings
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server in the port ${PORT}`);
});