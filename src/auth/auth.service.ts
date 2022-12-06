/**
 * Partial 将参数转为可选参数
 */

import { HttpException, HttpServer, HttpStatus, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/user/entities/user.entity'
import { Repository } from 'typeorm'

@Injectable()
export class AuthService {

  constructor(
    private jwtService: JwtService,
    @InjectRepository(User) private userRepository: Repository<User>
  ) { }

  // 生成token
  createToken(user: Partial<User>) {
    return this.jwtService.sign(user)
  }

  // 登陆
  async login(user: Partial<User>) {
    const token = this.createToken({
      id: user.id,
      username: user.username,
      role: user.role
    })

    return { token }
  }

  // 获取用户信息
  async getUserInfo(user: User) {

    const { username } = user
    const existUser = await this.userRepository.findOne({ where: { username } })

    return existUser
  }
}
