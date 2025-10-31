import { Router } from "express";
import { criartarefa, deletarTarefa, editarTarefa, listarTarefas } from "./tarefaController.js"

const router = Router();

router.post("/", criartarefa);
router.get("/", listarTarefas);
router.put("/:id", editarTarefa);
router.delete("/:id", deletarTarefa);


export default router;