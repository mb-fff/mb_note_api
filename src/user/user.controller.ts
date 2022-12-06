import { Body, Req, Controller, Post, ClassSerializerInterceptor, UseInterceptors, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { CreateUserDto } from './dto/createUserDto.dto'
import { UserService } from './user.service'

@ApiTags('user模块')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  /**
   * 注册用户
   * @param req 
   * @returns 
   */
  @ApiOperation({ summary: '注册用户' })
  @Post('register')
  // 配合实体类中 Exclude 来过滤响应数据
  @UseInterceptors(ClassSerializerInterceptor)
  async register(@Body() req: CreateUserDto) {
    return this.userService.register(req)
  }

  /**
   * 获取用户信息
   * @ApiBearerAuth swagger文档设置token
   * @param req 
   * @returns 
   */
  @ApiOperation({ summary: '获取用户信息' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('getUserInfo')
  @UseInterceptors(ClassSerializerInterceptor)
  async getUserInfo(@Req() req) {
    return req.user
  }
}
