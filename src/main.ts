/**
 * 应用程序的入口文件，使用 NestFactory 来创建Nest应用程序的实例
 * 异步函数 bootstrap 用来引导应用程序的启动过程
 */

import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { HttpExceptionFilter } from './core/filter/http-exception.filter'
import { TransformInterceptor } from './core/interceptor/transform.interceptor'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'
import { NestExpressApplication } from '@nestjs/platform-express'
import { join } from 'path'

async function bootstrap() {
  // 创建实例
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  // 设置全局路由前缀 http://localhost:10010/api/
  app.setGlobalPrefix('api')

  // 配置静态资源
  app.useStaticAssets(join(__dirname, '../../', 'uploads'), {
    // 前缀
    prefix: '/uploads'
  })

  // 允许跨域
  app.enableCors()

  // 注册全局错误过滤器
  app.useGlobalFilters(new HttpExceptionFilter())

  // 注册全局响应拦截
  app.useGlobalInterceptors(new TransformInterceptor())

  // 注册管道（用于校验参数类型）
  app.useGlobalPipes(new ValidationPipe())

  // 配置接口文档
  const config = new DocumentBuilder()
    .setTitle('API文档')
    .setDescription('API文档')
    .setVersion('1.0')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api/docs', app, document)

  // 启动端口
  await app.listen(10010)
  console.log('')
  console.log('接口地址为：http://localhost:10010/api/')
  console.log('')
  console.log('接口文档地址为：http://localhost:10010/api/docs')
}

bootstrap()
