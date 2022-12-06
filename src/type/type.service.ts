import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { getRepository, Repository } from 'typeorm'
import { Type } from './entities/type.entity'

export interface TypeRes {
  list: Type[]
  count: number
}

@Injectable()
export class TypeService {

  constructor(@InjectRepository(Type) private readonly typeRepository: Repository<Type>) { }

  // 获取笔记类型
  async getAllType(): Promise<TypeRes> {
    const qb = await getRepository(Type).createQueryBuilder('type')
    qb.where('1 = 1')
    const res = await qb.getMany()
    const count = await qb.getCount()

    return {
      list: res,
      count
    }
  }
}
