import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import ResendConfirmDto from '../dto/resend-confirm.dto';
import { EmailConfirmationService } from './email-confirmation.service';

@Controller('email-confirmation')
export class EmailConfirmationController {
  constructor(
    private readonly emailConfirmationService: EmailConfirmationService,
  ) {}

  @Get('confirm')
  async confirm(@Query('token') token: string) {
    const email = await this.emailConfirmationService.decodeConfirmationToken(
      token,
    );
    await this.emailConfirmationService.confirmEmail(email);
  }

  @Post('resend-confirmation-link')
  async resendConfirmationLink(@Body() request: ResendConfirmDto) {
    await this.emailConfirmationService.resendConfirmationLink(request.email);
  }
}
