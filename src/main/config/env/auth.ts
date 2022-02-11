export const authConfig = {
  /** Authentication */

  ACCESS_TOKEN_SECRET: process.env.JWT_AUTH_SECRET,
  ACCESS_TOKEN_EXPIRES_IN_SECONDS: 15 * 60, // 👈 15 min

  /** Hash provider */

  HASH_SALT: 12,
};
