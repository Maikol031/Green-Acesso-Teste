import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("lotes")
export class Lotes {

    @PrimaryGeneratedColumn({name: "id"})
    id!: number;

    @Column({name: "nome", type: "varchar", length: 100})
    nome!: string;

    @Column({name: "ativo", type: "boolean"})
    ativo!: boolean;

    @Column({name: "criado_em", type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    criadoEm!: Date;
}