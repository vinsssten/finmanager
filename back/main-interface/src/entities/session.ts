import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('session')
export class Session {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column()
  token: string;

  @Column({ name: 'date_create' })
  dateCreate: Date;
}
