/**
 * 实体类
 * note （表名）
 */

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('note')
export class Note {
  // 标记为主键，值自动生成
  @PrimaryGeneratedColumn()
  id: number

  // 标题
  @Column({ length: 50 })
  title: string

  // 作者
  @Column({ length: 20 })
  author: string

  // 内容
  @Column('text')
  content: string

  // 描述
  @Column({ length: 50 })
  desc: string

  // 笔记封面
  @Column({ default: '' })
  cover_url: string

  // 类型
  @Column('tinyint')
  type: number

  // 浏览量
  @Column()
  views: number

  // 留言量
  @Column()
  comments: number

  // 创建时间
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  create_time: Date

  // 更新时间
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  update_time: Date
}
