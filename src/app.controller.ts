import { Controller, Get } from '@nestjs/common';
import { AppService, SBDService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly sbdService: SBDService
    ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('/sbd')
  getSBD(): string {
    return this.sbdService.getSBD()
  }
}
