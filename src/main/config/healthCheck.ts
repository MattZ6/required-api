import type { Express } from 'express';

export function setupHealthCheckEndpoint(app: Express) {
  app.get('/health', (_, res) => res.status(204).send());
}
