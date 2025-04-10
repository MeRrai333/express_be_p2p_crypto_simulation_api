import { Prisma } from "@prisma/client";
import { AppError, IAppError } from "../middlewares/errorHandler";

export function prismaError(e: unknown){
    const err: IAppError = new Error('some error')
    if( e instanceof Prisma.PrismaClientKnownRequestError){
        console.error(e)
        if(e.code === 'P2002'){
            err.message = 'Unique key constraint'
            err.status = 400
        }
        else if(e.code === 'P2003'){
            err.message = `Some data not found in database ${e.meta ? `(${e.meta.field_name})` : ''}`
            err.status = 400
        }
        else if(e.code === 'P2025'){
            err.message = 'Not found'
            err.status = 400
        }
        else{
            const err: IAppError = new Error('DB error')
            err.status = 500
        }
    }
    else if(e instanceof AppError){
        return e
    }
    else if(e instanceof Error){
        err.message = e.message;
    }
    return err;
}