import { AppDataSource } from "@/data-source";
import { Boleto } from "@/database/models/boletos";


export class BoletoRepository {
  private repo = AppDataSource.getRepository(Boleto);

  async createMany(data: Partial<Boleto>[]) {
    const boletos = this.repo.create(data);
    return this.repo.save(boletos);
  };

  async findAllOrdered(): Promise<Boleto[]> {
    const result = await this.repo
      .createQueryBuilder('boleto')
      .select(['boleto.id', 'boleto.nomeSacado'])
      .orderBy('boleto.id', 'ASC')
      .getMany();

    return result;
  };


  async findAll(filters: any): Promise<Boleto[]> {
    let queryBuilder = this.repo.createQueryBuilder('boleto');

    if (filters.nome) {
      queryBuilder = queryBuilder.andWhere('boleto.nomeSacado LIKE :nome', { nome: `%${filters.nome}%` });
    }

    if (filters.valor_inicial) {
      queryBuilder = queryBuilder.andWhere('boleto.valor >= :valor_inicial', { valor_inicial: parseFloat(filters.valor_inicial) });
    }

    if (filters.valor_final) {
      queryBuilder = queryBuilder.andWhere('boleto.valor <= :valor_final', { valor_final: parseFloat(filters.valor_final) });
    }

    if (filters.id_lote) {
      queryBuilder = queryBuilder.andWhere('boleto.idLote = :id_lote', { id_lote: parseInt(filters.id_lote) });
    }

    return await queryBuilder.getMany();
  };


}
