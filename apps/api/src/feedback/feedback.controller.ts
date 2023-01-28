import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class FeedbackController {
  constructor(
    @Inject('FEEDBACK_SERVICE') private feedbackService: ClientProxy
  ) { }

  // route to fetch a single feedback
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

  // route to post a single feedback
  @Get('/create-feedback')
  async createFeedback() {
    return this.feedbackService.send(
      {
        cmd: 'create-feedback'
      },
      {

      }
    )
  }


}
