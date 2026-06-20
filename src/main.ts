import { createApp } from '~/app'
import { env } from '~/env'

const app = createApp()

const server = app.listen(env.port, () => {
  console.log(
    `[payex-billing-system] HTTP server started on port ${env.port}`
  )
})

function shutdown(signal: NodeJS.Signals): void {
  console.log(`[payex-billing-system] Received ${signal}`)

  server.close((error) => {
    if (error !== undefined) {
      console.error(
        '[payex-billing-system] Failed to close HTTP server',
        error
      )

      process.exitCode = 1
      return
    }

    console.log('[payex-billing-system] HTTP server stopped')
    process.exitCode = 0
  })
}

process.once('SIGINT', shutdown)
process.once('SIGTERM', shutdown)
