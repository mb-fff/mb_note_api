import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class GetNoteByIdDto {

  @IsNotEmpty({ message: '笔记ID不能为空' })
  @ApiProperty({ description: '笔记ID' })
  readonly id: number
}