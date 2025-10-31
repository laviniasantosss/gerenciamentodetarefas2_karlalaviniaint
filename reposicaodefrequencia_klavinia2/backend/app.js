import express from "express"
import cors from "cors"
import { errorHandler } from "./middleware/errorHandler.js";
import { conn } from "./config/sequelize.js";

import { tarefaModel } from "./feature/tarefaModel.js";

import tarefaRoutes from "./feature/tarefaRoutes.js";

const app = express()

conn.sync()


//permitir interagir com o front-end
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))

app.use(express.json());

app.use("/api/tarefas", tarefaRoutes)

//404
app.use((request, response) => {
    response.status(404).json({mensagem: "Rota não existe!"})
})
//Erro handler
app.use(errorHandler)

export default app;