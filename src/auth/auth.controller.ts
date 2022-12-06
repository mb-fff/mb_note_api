import { Body, ClassSerializerInterceptor, Controller, Headers, Post, Res, UseGuards, UseInterceptors } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { AuthGuard } from '@nestjs/passport'
import { LoginDto } from './dto/loginDto'
import { WechatLoginDto } from './dto/wechatLoginDto'

@ApiTags('auth模块')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  /**
   * 登录校验
   * @param req 
   * @returns 
   */
  @ApiOperation({ summary: '登陆校验' })
  @UseGuards(AuthGuard('local'))
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('login')
  async login(@Body() req: LoginDto) {
    return this.authService.login(req)
  }
}
