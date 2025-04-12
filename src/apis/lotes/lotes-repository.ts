import { AppDataSource } from "@/data-source";
import { Lotes } from "@/database/models/lotes";
import { In } from "typeorm";

export class LoteRepository {
  private repo = AppDataSource.getRepository(Lotes);

  async findByUnidades(unidades: string[]): Promise<{ nome: string; id: number }[]> {
    return this.repo.find({
      where: {
        nome: In(unidades),
      },
      select: {
        nome: true,
        id: true,
      },
    });
  }
}
