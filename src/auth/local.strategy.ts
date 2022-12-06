/**
 * 定义 LocalStrategy 继承 PassportStrategy类，（策略，策略别名）
 *    第一个参数 Strategy 要使用的策略，这里是passport-local
 *    第二个参数 策略别名，使用的是策略是passport-local，策略别名默认为local
 * 
 * 调用super传递策略参数，如果传入的是username和password，可以不用写(默认)
 * 如果传入的参数是email，那usernameField对应的value就是email
 * 
 * validate 是 LocalStrategy的内置方法，用作用户查询和密码比对
 */

import { compareSync } from 'src/util/bcrypt'
import { PassportStrategy } from '@nestjs/passport'
import { IStrategyOptions, Strategy } from 'passport-local'
import { User } from 'src/user/entities/user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { HttpException, HttpStatus } from '@nestjs/common'

export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {
    super({
      usernameField: 'username',
      passwordField: 'password'
    } as IStrategyOptions)
  }

  // 校验用户名与密码
  async validate(username: string, password: string) {

    const user = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.username=:username', { username })
      .getOne()

    if (!user) throw new HttpException('用户名不存在！', HttpStatus.BAD_REQUEST)

    if (!compareSync(password, user.password)) throw new HttpException('密码错误！', HttpStatus.BAD_REQUEST)

    return user
  }
}