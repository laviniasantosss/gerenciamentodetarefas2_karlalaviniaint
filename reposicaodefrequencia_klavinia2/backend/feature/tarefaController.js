import { tarefaModel } from "./tarefaModel.js";


export async function criartarefa(request, response, next){
   const {titulo, descricao, data_prazo} = request.body

   try {
    if(!titulo){
        const err = new Error("O campo titulo é obrigatório")
        err.statusCode = 400;
        throw err;
    }
           if(!descricao){
        const err = new Error("O campo descricao é obrigatório")
        err.statusCode = 400;
        throw err;
    }

       if(!data_prazo){
        const err = new Error("O campo data_prazo é obrigatório")
        err.statusCode = 400;
        throw err;
       }
      
       const novaTarefa = await tarefaModel.create({ titulo, descricao, data_prazo })
       response.status(201).json({mensagem: "Tarefa Criada, novaTarefa"})

   } catch (error) {
    next(error);
   }
}

export async function listarTarefas (request, response, next){
    try {
        const tarefas = await tarefaModel.findAll({
            attributes: ["id", "titulo", "descricao", "data_prazo", "status"]

        })
        response.status(200).json({tarefas})
    } catch (error) {
        next(error)
    }
}

export async function editarTarefa (request, response, next){
     const { id } = request.params; //identifico
    const { titulo, descricao, data_prazo, status} = request.body;
    
    try {
        if(!id){
            const err = new Error ("O ID é obrigatório")
            err.statusCode = 400
            throw err;
        }

        const tarefa = await tarefaModel.findByPk(id)
        if(!tarefa){
            const err = new Error("tarefa não encontrada")
            err.statusCode = 404
            throw err;
        }
        if (titulo !== undefined){
            tarefa.titulo = titulo
        }
        if (descricao !== undefined){
            tarefa.descricao = descricao
        }
        if (data_prazo !== undefined){
            tarefa.data_prazo = data_prazo
        }
        if (status !== undefined){
            tarefa.status = status
        }

        await tarefa.save()
        response.status(200).json({tarefa})
    } catch (error) {
        next (error)
        
    }
}

export async function deletarTarefa (request, response, next){
   const {  id } = request.params;
   try {
     if(!id){
            const err = new Error ("O ID é obrigatório")
            err.statusCode = 400
            throw err;
     }
     const tarefadeletada = await tarefaModel.destroy ({where: { id } });
  
      if(tarefadeletada === 0) {
            const err = new Error ("Tarefa não encontrada");
            err.statusCode = 404;
            throw err;
      }
      return response.status(200).json({
      success: true,
      message: "Tarefa deletada com sucesso!",
    });
   } catch (error) {
    next (error)
   }
}