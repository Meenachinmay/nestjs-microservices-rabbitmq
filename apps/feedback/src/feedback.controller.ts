import { Controller, Get } from '@nestjs/common';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';
import { FeedbackService, IFeedback } from './feedback.service';

@Controller()
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) { }

  @MessagePattern({ cmd: 'get-feedback' })
  async getFeedback(@Ctx() context: RmqContext): Promise<IFeedback> {
    const channel = context.getChannelRef()
    const message = context.getMessage()

    channel.ack(message)


    return this.feedbackService.getFeedback()
  }

}
