import { NextFunction, Request, Response } from 'express';

// Tipo para representar o tipo combinado de params, query e body
// type AllType<Req extends Request> = Req['params'] & Req['query'] & Req['body'];

// Estendendo o tipo Request do Express para adicionar o método 'all' e 'qs'
declare global {
  namespace Express {
    interface Request {
      all<Output extends Record<string, any>>(): Output;
      only<Output extends Record<string, any>>(
        fields: (keyof Output)[]
      ): Output;
      qs<Output extends Record<string, any>>(): Output;
    }
  }
}

// Middleware para adicionar o método 'all' e 'qs' ao objeto de solicitação
export function dataHandling(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  req.all = function () {
    return Object.assign({}, req.query, req.params, req.body);
  };

  req.only = function <Output extends Record<string, any>>(
    fields: (keyof Output)[]
  ): Output {
    // Tipo do retorno é Output
    const onlys = {} as Output;
    for (let field in fields) {
      // Tipo dos valores atribuídos é sempre tipo de Output[field]
      onlys[field as unknown as keyof Output] =
        req.params[field] || req.body[field] || req.query[field];
    }
    return onlys;
  };

  req.qs = function <Output extends Record<string, any>>(): Output {
    return Object.assign({}, req.query) as Output;
  };

  next();
}
