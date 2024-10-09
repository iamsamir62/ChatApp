import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js";
import userRoute from "./routes/userRoute.js"
import messageRoute from "./routes/messageRoute.js"
import cookieParser from "cookie-parser"
import cors from "cors"


const app = express();
dotenv.config();
const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true, // This allows cookies and credentials to be sent
};

app.use(cors(corsOptions));

connectDB();

const PORT = process.env.PORT || 8000;
//middleware
app.use(express.json())
app.use(cookieParser());
//routes
app.use("/api/user", userRoute)
app.use("/api/message", messageRoute)

app.listen(PORT, () => {
  console.log(`Server Listen at port ${PORT}`);

})