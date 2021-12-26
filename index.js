import express from "express";
//import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import postRoutes from "./routes/posts.js";
import dotenv from 'dotenv';

const app = express();
dotenv.config;


app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/posts', postRoutes);
app.get("/", (req, res) => {
  res.send("Hello To Vet+ API");
});

const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL).then(()=>{console.log('...')})
  .then(() =>app.listen(PORT, () => console.log(`server running on port : ${PORT}`)))
  .catch((error) => console.log(error.message));


