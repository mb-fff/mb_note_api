/**
 * 应用程序的根模块（Module）
 * @Module 装饰器 接收四个属性（providers、controllers、imports、exports）
 * providers：服务提供者，处理具体的业务逻辑
 * controllers：处理http请求，包括路由控制，向客户端返回响应，将具体业务逻辑委托给providers处理
 * imports：导入模块的列表，如果需要使用其他模块的服务，则需要通过这里导入
 * exports：导出服务的列表，供其他模块导入使用，如果想要将当前模块下的服务共享，需要在这里配置导出
 */

import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigService, ConfigModule } from '@nestjs/config'
import { NoteModule } from './note/note.module'
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'
import { TypeModule } from './type/type.module'
import envConfig from '../config/env'
import { FileModule } from './file/file.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [envConfig.path]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        entities: [],
        host: configService.get('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 3306),
        username: configService.get('DB_USER', 'root'),
        password: configService.get('DB_PASSWORD', 'MYSQL'),
        database: configService.get('DB_DATABASE', 'mb_note_db'),
        // 时区
        timezone: '+08:00',
        logger: 'advanced-console',
        // 自动将实体映射到数据库表
        synchronize: true,
        // 自动加载实体
        autoLoadEntities: true
      })
    }),
    NoteModule,
    UserModule,
    AuthModule,
    TypeModule,
    FileModule
  ],
  exports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
