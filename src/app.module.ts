import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService, SBDService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, SBDService],
})
export class AppModule {}
