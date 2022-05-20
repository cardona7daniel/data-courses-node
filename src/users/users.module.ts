import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { EmailConfirmationService } from '@src/auth/email/email-confirmation.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import EmailService from '@src/shared/utils/email.service';
import { PassportModule } from '@nestjs/passport';

// TODO: SEPARATE THIS INTO A SHARED MODULE TO JWT CONFIG
@Module({
  imports: [
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
  controllers: [UsersController],
  providers: [
    UsersService,
    ConfigService,
    EmailService,
    EmailConfirmationService,
  ],
  exports: [UsersService],
})
export class UsersModule {}
