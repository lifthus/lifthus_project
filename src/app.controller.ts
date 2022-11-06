import { Controller, Get, Redirect, HttpCode, Post, Req, Query, Param, HostParam, Body } from '@nestjs/common';
import { Request } from 'express';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}