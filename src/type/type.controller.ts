import { Controller, Post } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { TypeService } from './type.service'

@ApiTags('type模块')
@Controller('type')
export class TypeController {
  constructor(private readonly typeService: TypeService) { }

  /**
   * @description 获取笔记类型列表
   * @returns 
   */
  @ApiOperation({ summary: '查询笔记类型' })
  @Post('getAllType')
  async getAllType() {
    return await this.typeService.getAllType()
  }
}
