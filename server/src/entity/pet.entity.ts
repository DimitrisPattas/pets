import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Image } from './image.entity';
import { Location } from './location.entity';

@Entity()
export class Pet {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @Column()
  birthday: Date;

  @Column()
  kind: string;

  @Column()
  gender: string;

  @ManyToOne(() => User, (user) => user.pets)
  @JoinColumn({ name: 'owner_id' })
  owner: User;

  @Column({ enum: ['missing', 'adoption'], default: 'missing' })
  status: string;

  @ManyToOne(() => Location, (location) => location.pets)
  @JoinColumn({ name: 'location_id' })
  location: Location;

  @Column()
  tag: string;

  @Column('text')
  description: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Image, (image) => image.pet)
  images: Image[];
}
