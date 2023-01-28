import { Controller, Get } from '@nestjs/common';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';
import { AuthService, IUser } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @MessagePattern({ cmd: 'get-users' })
  async getUser(@Ctx() context: RmqContext): Promise<IUser[]> {
    const channel = context.getChannelRef()
    const message = context.getMessage()

    channel.ack(message)

    // here we will do the code to respond to the client request
    return this.authService.getUsers()
  }

  @MessagePattern({ cmd: 'post-user' })
  async createUser(@Ctx() context: RmqContext): Promise<IUser> {
    const channel = context.getChannelRef()
    const message = context.getMessage()

    channel.ack(message)

    const post = await this.authService.postUser()

    // here we will do the code to respond to the client request
    return post
  }


}
