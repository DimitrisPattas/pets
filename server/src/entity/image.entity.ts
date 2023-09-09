import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Pet } from './pet.entity';

@Entity()
export class Image {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  image_path: string;

  @ManyToOne(() => Pet, (pet) => pet.images)
  pet: Pet;
}
