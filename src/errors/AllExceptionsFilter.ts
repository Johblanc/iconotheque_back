import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

/**
 * Permet de récupérer l'enssemble des Exceptions issues des divers controleurs.
 * Cette fonctionnalité formate l'erreur avant de la renvoyer dans la console et dans le front.
 * @Responce .statusCode  : Valeur du Code Status de la responce
 * @Responce .timestamp   : Moment d'apparition de l'erreur
 * @Responce .path        : Route utilisée pour aboutir à cette erreur
 * @Responce .message     : Information sur l'erreur
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter 
{
  catch(exception: HttpException, host: ArgumentsHost) 
  {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exept : string | {statusCode?: number, message?:string,error?:string} = exception.getResponse();

    if (typeof exept === "object")
    {
      console.log( `${request.method} | ${status} | ${request.url}\n${exept.error}`)
      response
        .status(status)
        .json({
          ...exept,
          timestamp: new Date().toISOString(),
          path: request.url
        });
    }
    else
    {
      console.log( `${request.method} | ${status} | ${request.url}\n${exept}`)
      response
        .status(status)
        .json({
          statusCode: status,
          timestamp: new Date().toISOString(),
          path: request.url,
          message: exept
        });
    }
  }
}