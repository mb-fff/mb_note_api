/**
 * @BeforeInsert 指该方法在数据插入之前调用
 * @Column 设置name属性，可以将字段转为name存入数据库  设置select:false表示隐藏该字段（仅对于查询）
 * @Exclude 过滤字段，配合controller里的 ClassSerializerInterceptor来实现对字段的过滤
 */
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { hashSync } from 'src/util/bcrypt'
import { Exclude } from 'class-transformer'

@Entity('user')
export class User {

  @PrimaryGeneratedColumn('uuid')
  id: number

  // 用户名
  @Column({ length: 100 })
  username: string

  // 昵称
  @Column({ length: 100 })
  nickname: string

  // 密码
  @Exclude()
  @Column()
  password: string

  // 头像
  @Column()
  avatar: string

  // 邮箱
  @Column()
  email: string

  // 角色
  @Column('simple-enum', { enum: ['root', 'author', 'visitor'] })
  role: string

  // 创建时间
  @Column({ name: 'create_time', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createTime: Date

  // 更新时间
  @Column({ name: 'update_time', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updateTime: Date

  @BeforeInsert()
  async encryptPwd() {
    this.password = await hashSync(this.password)
  }
}
