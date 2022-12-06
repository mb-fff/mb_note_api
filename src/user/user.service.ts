import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateUserDto } from './dto/createUserDto.dto'
import { User } from './entities/user.entity'

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

  // 注册用户
  async register(req: CreateUserDto) {
    const { username } = req
    const existUser = await this.userRepository.findOne({ where: { username } })
    if (existUser) throw new HttpException('用户名已存在', HttpStatus.BAD_REQUEST)
    const newUser = await this.userRepository.create(req)
    return await this.userRepository.save(newUser)
  }
}
