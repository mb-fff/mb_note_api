/**
 *采用 fromAuthHeaderAsBearerToken 从请求头中的 Authorization 中获取token
 */

import { ConfigService } from "@nestjs/config"
import { HttpException, HttpStatus } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { StrategyOptions, Strategy, ExtractJwt } from 'passport-jwt'
import { InjectRepository } from "@nestjs/typeorm"
import { User } from "src/user/entities/user.entity"
import { Repository } from "typeorm"
import { AuthService } from "src/auth/auth.service"

export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
    private readonly authService: AuthService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('SECRET')
    } as StrategyOptions)
  }

  async validate(user: User) {

    const existUser = await this.authService.getUserInfo(user)

    if (!existUser) {
      throw new HttpException('token不正确', HttpStatus.BAD_REQUEST)
    }

    return existUser
  }

}