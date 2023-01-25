import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    @Inject('AUTH_SERVICE') private authSerivce: ClientProxy
  ) { }

  @Get()
  async getUser() {
    return this.authSerivce.send(
      {
        cmd: 'get-user'
      },
      {

      }
    )
  }
}
