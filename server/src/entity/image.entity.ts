import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Pet } from './pet.entity';

@Entity()
export class Image {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'image_name', unique: true })
  imageName: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => Pet, (pet) => pet.images, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'pet_id' })
  pet: Pet;
}
