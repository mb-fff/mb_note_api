import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('type')
export class Type {

  @PrimaryGeneratedColumn()
  id: number

  @Column('tinyint')
  type: number

  @Column({ length: 20 })
  type_desc: string
}
