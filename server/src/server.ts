import mainRouter from "./routes";
import express from "express";
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

app.use(mainRouter);


app.listen(3030, () => console.log("Server está rodando na porta 3030 🚀"));

// npm install prisma --save-dev
// npx prisma migrate dev
// Dar start no projeto => npm dev e pra parar (ctrl + c)