import express, { json, urlencoded } from 'express'
import cors from 'cors'
import { NODE_ENV, PORT, ORIGIN, CREDENTIALS } from '@/configs'
import { logger } from '@/utils/logger'
import errorMiddleware from '@/middlewares/error'

class App {
  public app: express.Application
  public env: string
  public port: string | number

  constructor(routes: Routes[]) {
    this.app = express()
    this.env = NODE_ENV || 'development'
    this.port = PORT || 3300

    this.initMiddlewares()
    this.initRoutes(routes)
    this.initErrorHandling()
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`====================================`)
      logger.info(`========= ENV: ${this.env} =========`)
      logger.info(` 🚀 App listening on the port ${this.port}`)
      logger.info(`====================================`)
    })
  }

  public getServer() {
    return this.app
  }

  private initMiddlewares() {
    // 请求解析
    this.app.use(json())
    this.app.use(urlencoded({ extended: true }))
    // 配置跨域代理
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }))
  }

  private initRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use('/', route.router)
    })
  }

  private initErrorHandling() {
    this.app.use(errorMiddleware)
  }
}

export default App
