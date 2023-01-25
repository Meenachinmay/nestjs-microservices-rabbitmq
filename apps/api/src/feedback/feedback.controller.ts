import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class FeedbackController {
  constructor(
    @Inject('FEEDBACK_SERVICE') private feedbackService: ClientProxy
  ) { }

  @Get('/feedback')
  async getFeedback() {
    return this.feedbackService.send(
      {
        cmd: 'get-feedback'
      },
      {

      }
    )
  }
}
