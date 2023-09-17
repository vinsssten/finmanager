import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pnl_transaction')
export class PnlTransaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column({ name: 'balance_id' })
  balanceId: number;

  @Column({ name: 'date_create' })
  dateCreate: string;

  @Column({ name: 'type_id' })
  typeId: number;
}
