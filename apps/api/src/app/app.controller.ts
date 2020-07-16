import { Controller, Get, Req } from '@nestjs/common';

import { Message } from '@angular-gql/api-interfaces';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService
  ) {}

  @Get('hello')
  getData(@Req() request: Request): Message {
    return this.appService.getData();
  }
}
