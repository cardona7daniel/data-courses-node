import DatabaseConfig from './database.config';
import EmailConfig from './email.config';
import JwtConfig from './jwt.config';

export default () => ({
  environment: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  ...JwtConfig(),
  ...EmailConfig(),
  database: {
    ...DatabaseConfig(),
  },
});
