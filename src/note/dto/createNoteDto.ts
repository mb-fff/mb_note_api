/**
 * DTO（data transfer object）数据传输对象
 * 对参数类型进行验证 npm i class-validator class-transformer -S 配合管道使用
 * 定义 请求参数
 */

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber } from 'class-validator'

export class CreateNoteDto {

  @IsNotEmpty({ message: '笔记标题不能为空' })
  @ApiProperty({ description: '笔记标题' })
  readonly title: string

  @IsNotEmpty({ message: '作者不能为空' })
  @ApiProperty({ description: '作者' })
  readonly author: string

  @ApiPropertyOptional({ description: '内容' })
  readonly content: string

  @ApiPropertyOptional({ description: '笔记封面' })
  readonly cover_url: string

  @IsNotEmpty({ message: '笔记类型不能为空' })
  @ApiProperty({ description: '笔记类型' })
  readonly type: number
}