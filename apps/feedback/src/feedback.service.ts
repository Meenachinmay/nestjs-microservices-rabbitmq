import { Injectable } from '@nestjs/common';

export type IFeedback = {
  title: string,
  rating: number
}

@Injectable()
export class FeedbackService {

  async getFeedback(): Promise<IFeedback> {
    return { title: "I am a title from getFeedback method", rating: 4 }
  }

  async createFeedback(): Promise<IFeedback> {
    return { title: "I am a title from createFeedback method", rating: 3 }
  }

}



