const JwtConfig = () => ({
  secretToken: process.env.JWT_VERIFICATION_TOKEN_SECRET,
  expirationTime: process.env.JWT_VERIFICATION_TOKEN_EXPIRATION_TIME || 21600,
});

export default JwtConfig;
