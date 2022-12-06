import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { getRepository, Repository } from 'typeorm'
import { Note } from './entities/note.entity'

export interface NoteRes {
  list: Note[]
  count: number
}

@Injectable()
export class NoteService {

  constructor(@InjectRepository(Note) private readonly noteRepository: Repository<Note>) { }

  // 创建笔记
  async create(req: Partial<Note>): Promise<object> {
    const { title } = req
    if (!title) {
      throw new HttpException('缺少笔记标题', HttpStatus.BAD_REQUEST)
    }
    await this.noteRepository.save(req)
    return {
      msg: '创建成功'
    }
  }

  // 获取笔记列表
  async getAll(req): Promise<NoteRes> {
    const qb = await getRepository(Note).createQueryBuilder('note')
    qb.where('1 = 1')
    qb.orderBy('note.create_time', 'DESC')

    const { pageNum = 1, pageSize, ...params } = req

    if (params.type) {
      qb.where({ type: params.type })
    }
    if (pageSize) {
      qb.limit(pageSize)
      qb.offset(pageSize * (pageNum - 1))
    }
    const count = await qb.getCount()
    const res = await qb.getMany()

    return {
      list: res,
      count
    }
  }

  // 获取指定笔记
  async getById(req): Promise<Note> {
    const { id } = req
    const res = await this.noteRepository.findOne(id)
    if (!res) throw new HttpException(`id为${id}的文章不存在`, HttpStatus.BAD_REQUEST)

    return res
  }

  // 更新笔记
  async update(req): Promise<object> {
    const { id } = req
    const existPost = await this.noteRepository.findOne(id)
    if (!existPost) {
      throw new HttpException(`id为${id}的文章不存在`, HttpStatus.BAD_REQUEST)
    }
    const updatePost = this.noteRepository.merge(existPost, req)
    this.noteRepository.save(updatePost)

    return {
      msg: '更新成功'
    }
  }

  // 删除笔记
  async delete(req): Promise<object> {
    const { id } = req
    const existPost = await this.noteRepository.findOne(id)
    if (!existPost) {
      throw new HttpException(`id为${id}的文章不存在`, HttpStatus.BAD_REQUEST)
    }
    await this.noteRepository.remove(existPost)

    return {
      msg: '删除成功'
    }
  }

}
