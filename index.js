import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import * as path from "path";
import { v4 as uuidv4 } from "uuid";

import connectDB from "./config/db.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { fileURLToPath } from "url";

const app = express();
app.use(express.json());

dotenv.config();

connectDB();

const domainsAllowed = [process.env.FRONTEND_URL];
const corsOptions = {
  origin: function (origin, callback) {
    if (domainsAllowed.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

// Routes
app.use("/api/employees", employeeRoutes);
app.use("/api/user", userRoutes);

// // Images
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// app.use(express.urlencoded({ extended: false }));

// const storage = multer.diskStorage({
//   destination: path.join(__dirname, "./public/img/uploads"),
//   filename: (req, file, cb, filename) => {
//     cb(null, uuidv4() + path.extname(file.originalname));
//   },
// });

// app.use(multer({ storage: storage }).single("image"));

// Settings
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server in the port ${PORT}`);
});
