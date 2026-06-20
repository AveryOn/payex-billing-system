import express, {
    type Express,
    type NextFunction,
    type Request,
    type Response
  } from 'express'
  
  export function createApp(): Express {
    const app = express()
  
    app.disable('x-powered-by')
  
    app.use(express.json())
  
    app.get('/health', (_request: Request, response: Response) => {
      response.status(200).json({
        status: 'ok',
        service: 'payex-billing-system',
        timestamp: new Date().toISOString()
      })
    })
  
    app.use(
      (
        error: unknown,
        _request: Request,
        response: Response,
        _next: NextFunction
      ) => {
        console.error(error)
  
        response.status(500).json({
          error: {
            code: 'INTERNAL_SERVER_ERROR',
            message: 'An unexpected error occurred'
          }
        })
      }
    )
  
    return app
  }