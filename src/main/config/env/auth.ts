export const authConfig = {
  /** Authentication */

  ACCESS_TOKEN_SECRET: process.env.AUTH_SECRET,
  ACCESS_TOKEN_EXPIRES_IN_SECONDS: 15 * 60, // 👈 15 min
};
