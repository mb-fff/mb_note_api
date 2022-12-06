import { ApiPropertyOptional } from '@nestjs/swagger'

export class GetAllNoteDto {

  @ApiPropertyOptional({ description: '页码' })
  readonly pageNum: number

  @ApiPropertyOptional({ description: '条数' })
  readonly pageSize: number
}