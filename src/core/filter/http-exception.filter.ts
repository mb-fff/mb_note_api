/**
 * 过滤器，拦截错误请求
 * nest g filter core/filter/http-exception
 */
import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    // 获取请求上下文
    const ctx = host.switchToHttp()
    // 获取请求上下文中的response对象
    const response = ctx.getResponse()
    // 获取异常状态码
    const status = exception.getStatus()

    // 设置错误信息
    // res拿到的是管道数据验证获取的异常
    let res = exception.getResponse()['message']
    if (res) {
      res = typeof res === 'string' ? res : res[0]
    }

    // exception.message拿到的是HttpException捕获到的异常
    const message = res ? res : (exception.message ? exception.message : (`${status >= 500 ? 'Service Error' : 'Client Error'
      }`))
    // 设置错误统一返回格式
    const errorResponse = {
      data: {},
      message,
      code: -1
    }
    // 设置返回的状态码，请求头，发送错误信息
    response.status(status)
    response.header('Content-Type', 'application/json; charset=utf-8')
    response.send(errorResponse)
  }
}