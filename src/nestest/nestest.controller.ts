import { Controller, Get, Redirect, HttpCode, UseGuards,
    Post, Req, Query, Param, 
    HostParam, Body, HttpException, HttpStatus, ForbiddenException, ParseIntPipe, UsePipes } from '@nestjs/common';
import { Request } from 'express';

import { SBDService } from './nestest.service';

import { SomeTh } from './dto/nestest.dto';
import { SBD } from './interfaces/nestest.interface';
import { JoiValidationPipe } from './pipe/joiValidation.pipe';
import { RolesGuard } from './guard/roles.guard';
import { Roles } from './decorators/roles.decorators';

const joi = require('joi')

/* Service test */
@Controller('sbd')
@UseGuards(RolesGuard) // new RolesGuard() also possible, and can be applied at the method level too.
export class SBDController { // and app.useGlobalGuards(new RolesGuard()); for global guard.
    constructor( // and for global DI, like : provide: APP_GUARD to Module providers[] (A_G from /core)
        private readonly sbdService: SBDService,
    ) {}

    @Post()
    @Roles('admin')
    createSBD(@Body() sbd:SBD) : string {
        return this.sbdService.create(sbd);
    }

    @Get()
    findAll() : SBD[] {
        return  this.sbdService.findAll();
    }
    
    // Pipe does transformation or validation like:
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
      return this.sbdService.findAll();
    }
    // if the parameter isn't a INT, an exception is thrown.
    // Note that we are passing class, not an instance.
    // but we can pass instance like:
    // new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
    // and it is useful if we want to customize the option as you'd seen above.
    // and binding validation pipe is a little bit different.

    @Post()
    @UsePipes(new JoiValidationPipe(joi.object().keys({})))
    async create(@Body() sbd: SBD) {
      this.sbdService.create(sbd)
    }

    @Get(':id')
    async findID(@Param('id', new ParseIntPipe()) id ) {
      return console.log(id)
    }
    
    // DefaultValue Pipe, before the Parse pipe like:
    // @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number

    @Get('exception')
    async throwing() {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      // string or object
    }
    @Get('custom-exception')
    async throwing2() {
      throw new ForbiddenException();
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