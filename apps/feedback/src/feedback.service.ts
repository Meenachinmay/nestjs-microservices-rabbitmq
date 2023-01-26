import { Injectable } from '@nestjs/common';

export type IFeedback = {
  feedback: string
}

@Injectable()
export class FeedbackService {

  async getFeedback(): Promise<IFeedback> {
    return { feedback: "I am a string from a feedback microservice." }
  }

}
