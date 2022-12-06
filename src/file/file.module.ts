import { Module } from '@nestjs/common'
import { FileService } from './file.service'
import { FileController } from './file.controller'
import { MulterModule } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { extname } from 'path'

@Module({
  imports: [MulterModule.register({
    storage: diskStorage({
      // 文件存储路径
      destination: 'uploads',
      // 重写文件名称（采用时间戳）
      filename(req, file, cb) {
        const filename = `${Date.now() + extname(file.originalname)}`
        return cb(null, filename)
      }
    })
  })],
  controllers: [FileController],
  providers: [FileService]
})
export class FileModule { }
