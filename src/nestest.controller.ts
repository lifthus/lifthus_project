import { Controller, Get, Redirect, HttpCode, Post, Req, Query, Param, HostParam, Body } from '@nestjs/common';
import { Request } from 'express';

import { NestestService } from './nestest.service';

// redirection test
@Controller('red')
export class SBDController {
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
export class SomeTh { // cause we are using TS, need to determine Data Transfer Object schema
  name: string;
  age: number;
  breed: string;
} 
@Controller('pl')
export class PLController {
  @Post()
  async create(@Body() createSomething: SomeTh) {
    return ' this action adds something.'
  }
}