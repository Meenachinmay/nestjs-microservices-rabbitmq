import { Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    @Inject('AUTH_SERVICE') private authSerivce: ClientProxy
  ) { }

  @Get('/auth')
  async getUser() {
    return this.authSerivce.send(
      {
        cmd: 'get-users'
      },
      {

      }
    )
  }

  @Post('/auth_post')
  async postUser() {
    return this.authSerivce.send(
      {
        cmd: 'post-user'
      },
      {

      }
    )
  }

}
