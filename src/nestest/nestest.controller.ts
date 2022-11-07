import { Controller, Get, Redirect, HttpCode, 
    Post, Req, Query, Param, 
    HostParam, Body } from '@nestjs/common';
import { Request } from 'express';

import { SBDService } from './nestest.service';

import { SomeTh } from './dto/nestest.dto';
import { SBD } from './interfaces/nestest.interface';

/* Service test */
@Controller('sbd')
export class SBDController {
    constructor(
        private readonly sbdService: SBDService,
    ) {}

    @Post()
    createSBD(@Body() sbd:SBD) : string {
        return this.sbdService.create(sbd);
    }

    @Get()
    findAll() : SBD[] {
        return  this.sbdService.findAll();
    }

}

/* Controller test */
// redirection test
@Controller('red')
export class RedController {
  @Get()
  findSBD(@Req() req: Request): string {
    return `${'Redirection test\n/home'}`
  }
  
  @Get('home')
  @Redirect()
  getHome(){
    return {url:'/sbd'}
  }

  @Post('squat')
  createSquat(): string {
    return 'new Squat weight';
  }
}
// route parameters test
@Controller('param')
export class RParamController {
  @Get('t1/:t')
  showT(@Param() params): string {
    return `${params.t}`
  }

  @Get('t2/:t')
  showT2(@Param('t') p: string): string {
    return `${p}`
  }
}
// sub domain test : in windows, specific setting is needed.
@Controller({ host: 'sub.localhost:3005'})
export class SDController {
  @Get()
  index() : string {
    return 'Sub'
  }
}@Controller({ host: ':t1.sub.localhost:3005'})
export class SD2Controller {
  @Get()
  index(@HostParam('t1') t: string) : string {
    return `${t}`
  }
}

// payload test
@Controller('pl')
export class PLController {
  @Post()
  async create(@Body() createSomething: SomeTh) {
    return ' this action adds something.'
  }
}