import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Permet de récupérer l'enssemble des Requetes issues du front, de les chronométrer puis de les formater avant de les renvoyer.
 * @return .statusCode  : Valeur du Code Status de la responce
 * @return .timestamp   : Moment de la Réponce
 * @return .path        : Route utilisée pour aboutir à cette Réponce
 * @return .message     : Information sur la Réponce
 * @return .data        : Les Données demandées
 */
@Injectable()
export class ResponserInterceptor implements NestInterceptor 
{
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> 
  {
    const now = Date.now();
    return next
      .handle()
      .pipe(
        map((value : { message : string, data : any}) => {
            console.log(`${context.getArgs()[0].method} | ${context.getArgs()[1].statusCode} | ${context.getArgs()[0].url}\nDelais : ${Date.now() - now}ms\n${value.message}`)
            return {
                statusCode : context.getArgs()[1].statusCode,
                timestamp: new Date().toISOString(),
                path: context.getArgs()[0].url,
                message : value.message,
                data : value.data,
            }
        }),
      );
  }
}