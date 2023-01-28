import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FeedbackController } from './feedback/feedback.controller';
import { FeedbackService } from './feedback/feedback.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: "./.env"
    })
  ],
  controllers: [AppController, FeedbackController],
  providers: [
    AppService, FeedbackService,
    {
      provide: 'AUTH_SERVICE',
      useFactory: (configService: ConfigService) => {
        const USER = configService.get('RABBITMQ_USER')
        const PASS = configService.get('RABBITMQ_PASS')
        const HOST = configService.get('RABBITMQ_HOST')
        const QUEUE = configService.get('RABBITMQ_AUTH_QUEUE')

        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [`amqp://${USER}:${PASS}@${HOST}`],
            queue: QUEUE,
            queueOptions: {
              durable: true
            }
          }
        })
      },
      inject: [ConfigService]
    },
    {
      provide: 'FEEDBACK_SERVICE',
      useFactory: (configService: ConfigService) => {
        const USER = configService.get('RABBITMQ_USER')
        const PASS = configService.get('RABBITMQ_PASS')
        const HOST = configService.get('RABBITMQ_HOST')
        const QUEUE = configService.get('RABBITMQ_FEEDBACK_QUEUE')

        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [`amqp://${USER}:${PASS}@${HOST}`],
            queue: QUEUE,
            queueOptions: {
              durable: true
            }
          }
        })
      },
      inject: [ConfigService]
    },
  ],
})

export class AppModule { }
