import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Lotes } from './lotes';

@Entity('boletos')
export class Boleto {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'nome_sacado', type: 'varchar', length: 255 })
  nomeSacado!: string;

  @Column({ name: 'id_lote', type: 'int' })
  idLote!: number;

  @ManyToOne(() => Lotes)
  @JoinColumn({ name: 'id_lote' })
  lote!: Lotes;

  @Column({ type: 'decimal', scale: 2 })
  valor!: number;

  @Column({ name: 'linha_digitavel', type: 'varchar', length: 255 })
  linhaDigitavel!: string;

  @Column({ type: 'boolean', nullable: true })
  ativo!: boolean;

  @Column({ name: 'criado_em', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  criadoEm!: Date;
}
