import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { dataSourceOptions } from './db/data-source';
import { UserEntity } from './entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: "./.env"
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      /*useFactory: (configService: ConfigService) => ({
  type: 'postgres',
  url: configService.get('POSTGRES_URI'),
  autoLoadEntities: true,
  synchronize: true
}),*/
      useFactory: () => ({
        ...dataSourceOptions,
        autoLoadEntities: true,
        synchronize: true
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([
      UserEntity
    ])
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }

