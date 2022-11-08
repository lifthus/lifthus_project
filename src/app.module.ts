import { Module, NestModule, RequestMethod, MiddlewareConsumer } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { LoggerMiddleware } from './nestest/middleware/logger.middleware';

import { SBDModule } from './nestest/nestest.module';

@Module({
  imports: [ SBDModule ],
  controllers: [AppController ],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(LoggerMiddleware) // a single mw or multiple arguments to specify multiple mws.
    .exclude(
      {path:'sbd', method: RequestMethod.POST},
      'cats/(.*)'
    ) // at times we want to exclude certain routes.
    .forRoutes({path:'sbd', method: RequestMethod.GET}) // controllers also possible
  }
}

// MidlewareConsumer is a heper class which provides built-in methods to manage middleware.
