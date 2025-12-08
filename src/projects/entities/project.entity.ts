import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'project' })
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
