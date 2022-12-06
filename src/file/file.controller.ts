import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileService } from './file.service'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

@ApiTags('file模块')
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) { }

  @ApiOperation({ summary: '上传文件' })
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile('file') file) {
    const url = `http://localhost:10010/uploads/${file.filename}`
    // 返回url、原文件名
    return { url, filename: file.originalname }
  }
}
