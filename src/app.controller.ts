/**
 * 带有单个路由的基本控制器（Controller），负责处理收到的请求并将响应返回给客户端
 * 处理http请求，包括路由控制，向客户端返回响应
 * @Controller 装饰器
 */

import { Controller } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }
}
