const EmailConfig = () => ({
  emailConfirmationUrl: process.env.EMAIL_CONFIRMATION_URL,
  emailService: process.env.EMAIL_SERVICE,
  emailUser: process.env.EMAIL_USER,
  emailPassword: process.env.EMAIL_PASSWORD,
});

export default EmailConfig;
