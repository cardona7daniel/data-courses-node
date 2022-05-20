import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import VerificationTokenPayload from './verification-token.interface';
import { UsersService } from '@src/users/users.service';
import EmailService from '@src/shared/utils/email.service';

@Injectable()
export class EmailConfirmationService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
    private readonly usersService: UsersService,
  ) {}

  public async confirmEmail(email: string) {
    const user = await this.usersService.findByEmail(email);
    if (user.isEmailConfirmed) {
      throw new BadRequestException('Email already confirmed');
    }
    await this.usersService.markEmailAsConfirmed(email);
  }

  public async resendConfirmationLink(email: string) {
    const user = await this.usersService.findByEmail(email);
    if (user.isEmailConfirmed) {
      throw new BadRequestException('Email already confirmed');
    }
    await this.sendVerificationLink(user.email);
  }

  public async decodeConfirmationToken(token: string) {
    try {
      const payload = await this.jwtService.verify(token, {
        secret: this.configService.get('secretToken'),
      });

      if (typeof payload === 'object' && 'email' in payload) {
        return payload.email;
      }
      throw new BadRequestException();
    } catch (error) {
      if (error?.name === 'TokenExpiredError') {
        throw new BadRequestException('Email confirmation token expired');
      }
      throw new BadRequestException('Bad confirmation token');
    }
  }

  public sendVerificationLink(email: string) {
    try {
      const payload: VerificationTokenPayload = { email };
      const token = this.jwtService.sign(payload, {
        secret: this.configService.get('secretToken'),
        expiresIn: `${this.configService.get('expirationTime')}s`,
      });

      const url = `${this.configService.get(
        'emailConfirmationUrl',
      )}?token=${token}`;

      const text = `Welcome to the application. To confirm the email address, click here: ${url}`;

      return this.emailService.sendMail({
        to: email,
        subject: 'Email confirmation',
        text,
      });
    } catch (error) {
      throw new HttpException(
        'Has ocurred an error sending email confirmation',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
