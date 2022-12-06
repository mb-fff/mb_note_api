import { Body, Controller, Post } from '@nestjs/common'
import { CreateNoteDto } from './dto/createNoteDto'
import { DeleteNoteDto } from './dto/deleteNoteDto'
import { GetAllNoteDto } from './dto/getAllNoteDto'
import { GetNoteByIdDto } from './dto/getNoteByIdDto'
import { UpdateNoteDto } from './dto/updateNoteDto'
import { NoteService, NoteRes } from './note.service'
import { ApiTags, ApiOperation } from '@nestjs/swagger'

@ApiTags('note模块')
@Controller('note')
export class NoteController {
  constructor(private readonly noteService: NoteService) { }

  /**
   * 创建笔记
   * @param req 
   * @returns 
   */
  @ApiOperation({ summary: '创建笔记' })
  @Post('createNote')
  async create(@Body() req: CreateNoteDto) {
    return await this.noteService.create(req)
  }

  /**
   * 获取笔记列表
   * @param req 
   * @returns 
   */
  @ApiOperation({ summary: '获取笔记列表' })
  @Post('getAllNote')
  async getAll(@Body() req: GetAllNoteDto): Promise<NoteRes> {
    return await this.noteService.getAll(req)
  }

  /**
  * 获取指定笔记
  * @param req 
  * @returns 
  */
  @ApiOperation({ summary: '获取指定笔记' })
  @Post('getNoteById')
  async getById(@Body() req: GetNoteByIdDto) {
    return await this.noteService.getById(req)
  }

  /**
  * 更新笔记
  * @param req 
  * @returns 
  */
  @ApiOperation({ summary: '更新笔记' })
  @Post('updateNote')
  async update(@Body() req: UpdateNoteDto) {
    return await this.noteService.update(req)
  }

  /**
  * 删除笔记
  * @param req 
  * @returns 
  */
  @ApiOperation({ summary: '删除笔记' })
  @Post('deleteNote')
  async delete(@Body() req: DeleteNoteDto) {
    return await this.noteService.delete(req)
  }
}
