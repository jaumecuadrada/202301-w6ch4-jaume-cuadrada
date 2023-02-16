import { type Request, type Response } from "express";
import express from "express";

const app = express();

const port: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 4000;

app.use((req, res, next) => {
  console.log("Received a request!");
  next();
});

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello World" });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
