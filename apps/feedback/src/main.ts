import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { FeedbackModule } from './feedback.module';

async function bootstrap() {
  const app = await NestFactory.create(FeedbackModule);
  const configService = app.get(ConfigService)

  const USER = configService.get('RABBITMQ_USER')
  const PASS = configService.get('RABBITMQ_PASS')
  const HOST = configService.get('RABBITMQ_HOST')
  const QUEUE = configService.get('RABBITMQ_FEEDBACK_QUEUE')

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${USER}:${PASS}@${HOST}`],
      noAck: false,
      queue: QUEUE,
      queueOptions: {
        durable: true
      }
    }
  })

  app.startAllMicroservices()

}
bootstrap();
