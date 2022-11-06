import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { 
  RedController, RParamController,SDController, SD2Controller 
} from './nestest.controller'
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController, 
    RedController, RParamController,
    SDController, SD2Controller ],
  providers: [AppService],
})
export class AppModule {}
