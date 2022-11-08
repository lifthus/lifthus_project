import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

// The class should implement the NestMiddleware interface,
// while the function does not have any special requirements.
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction ) {
        console.log('Request!!!..!!');
        next();
    } // to App Module
}
// and we can apply it at module with configure() method in module class.
// and Modules which include middleware, have to implement the NEstModule.

/* Functional middleware */

export function logger(req: Request, res:Response, next: NextFunction) {
    console.log('Request!! functional mw');
    next();
}
// also could be applied like :
//consumer
//.apply(loger)
//.forRoutes(CatsController);

// Multiple middleware like :
// consumer.apply(cors(), helmet(), logger).forRoutes(SBDController);

// Global middleware like:
// const app = await NestFactory.create(AppModule);
// app.use(logger);
// await app.listen(3000);
