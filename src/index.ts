import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";

import authRoutes from "./routes/auth.routes";
import studentRoutes from "./routes/students.routes";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use(authRoutes);
app.use(cors());

app.use(authRoutes);
app.use(studentRoutes);

app.listen(process.env.PORT, () => {
  console.log("🚀 Server ready at: http://localhost:3000");
});
