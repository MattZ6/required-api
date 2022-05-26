import type { Express } from 'express';

export function setupHealthCheckEndpoint(app: Express) {
  // Maybe run migrations at this time

  app.get('/health', (_, res) => res.status(200).send());
}
