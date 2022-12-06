import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from 'src/user/entities/user.entity'
import { LocalStrategy } from './local.strategy'
import { JwtModule } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { JwtStrategy } from './jwt.strategy'

const jwtModule = JwtModule.registerAsync({
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    return {
      // 密钥
      secret: configService.get('SECRET', 'mb_note'),
      // 有效期
      signOptions: { expiresIn: '2h' }
    }
  }
})

@Module({
  imports: [TypeOrmModule.forFeature([User]), PassportModule, jwtModule],
  exports: [jwtModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy]
})
export class AuthModule { }
