import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column('simple-array')
  co2EstimateReduction: string[];

  @Column({ default: true })
  isActive: boolean;

  @Column()
  owner: string;

  @Column('simple-array')
  listing: string[];

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
  @DeleteDateColumn()
  deletedAt: string;
}
