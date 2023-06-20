import { execSync } from 'child_process'
import type { Express } from 'express'

export function setupHealthCheckEndpoint(app: Express) {
  // Maybe run migrations at this time

  app.get('/health', (_, res) => {
    execSync(`npm run prisma migrate deploy`, { stdio: 'inherit' })

    return res.status(200).send()
  })
}
