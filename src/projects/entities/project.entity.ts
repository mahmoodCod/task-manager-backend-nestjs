import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import statusEnum from '../enums/statusEnum';

@Entity({ name: 'project' })
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: statusEnum, default: statusEnum.Enable })
  status: statusEnum;
}
