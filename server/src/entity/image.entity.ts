import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Pet } from './pet.entity';

@Entity()
export class Image {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  image_path: string;

  @ManyToOne(() => Pet, (pet) => pet.images)
  @JoinColumn({ name: 'pet_id' })
  pet: Pet;
}
