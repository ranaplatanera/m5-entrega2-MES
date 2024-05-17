import { Task, TaskCreate, TaskUpdate, TaskRetrieve } from "../interfaces";
import { prisma } from "../database/prisma";
import { taskSchema, taskCreateSchema, taskUpdateSchema, TaskRetrieveSchema, TaskRetrieveSchemaByCat } from "../schemas";

export class TaskService {
    private task = prisma.task;

    public list = async (categoryName?: string, authHeader?: number): Promise<Array<Task>> => {
        const userId = authHeader;

        //Crear una función que filtre las búsquedas sólo para las del 
        //userId del token
        
        if (categoryName) { 
            const categoryTasks = await this.task.findMany({
                where: { category: { name: { equals: categoryName, mode: "insensitive" } }, user: { id: userId } }, 
                include: { category: true } 
            });
               
        return TaskRetrieveSchemaByCat.array().parse(categoryTasks);
        };

        const tasks = await this.task.findMany({
            where: { user: { id: userId } },
            include: { category: true },
        });

        return TaskRetrieveSchema.array().parse(tasks);
    };

    public retrieve = async (taskId: number): Promise<TaskRetrieve> => {
        console.log(taskId);
        const task = await this.task.findUnique( {
            where: { id: taskId },
            include: { category: true },
          });

        return TaskRetrieveSchema.parse(task);
    };

    public create = async ( payload: TaskCreate, authHeader: number): Promise<Task> => {
        const newpayload = { ...payload, userId: authHeader };
        const newTask = await prisma.task.create({ data: newpayload });
    
        return taskSchema.parse(newTask);
    };

    public update = async (taskId: number, payload: TaskUpdate): Promise<Task> => {
        const updatedTask = await prisma.task.update({ where: {id: taskId}, data: payload });

        return taskSchema.parse(updatedTask);
    };

    public delete = async (taskId: number): Promise<void> => {
        await prisma.task.delete({ where: { id: taskId } });
    };

    // public isTaskOwner = async (
    //     req: Request,
    //     res: Response
    //   ): Promise<void> => {
    //     const  decoded  = res.locals.decoded.id; 
    //     const  userId  = req.params.userId;
    
    //     console.log(decoded)
    //     console.log(userId)
    
    
    //     if (decoded !== userId) {
    //       throw new AppError(
    //         "This user is not the task owner",
    //         status.HTTP_403_FORBIDDEN
    //       );
    //     }
    // };

}