import { ApiProperty } from "@nestjs/swagger"

export class WechatLoginDto {

  @ApiProperty({ description: 'code值' })
  readonly code: string
}