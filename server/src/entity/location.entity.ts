import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Pet } from './pet.entity';

@Entity()
export class Location {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  coordinates: string;

  @OneToMany(() => Pet, (pet) => pet.location)
  pets: Pet[];
}
