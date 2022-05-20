import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UsersModule } from 'src/users/users.module';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { EmailConfirmationController } from './email/email-confirmation.controller';
import { EmailConfirmationService } from './email/email-confirmation.service';
import EmailService from '@src/shared/utils/email.service';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get('secretToken'),
          signOptions: {
            expiresIn: `${configService.get('expirationTime')}s`,
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController, EmailConfirmationController],
  providers: [
    AuthService,
    EmailService,
    EmailConfirmationService,
    ConfigService,
    JwtStrategy,
  ],
})
export class AuthModule {}
