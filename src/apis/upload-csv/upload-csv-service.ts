import fs from "fs";
import csv from "csv-parser";
import { ICsvSchema } from "@/apis/upload-csv/interfaces"
import { BoletoRepository } from "@/apis/boletos/boletos-repository";
import { LoteRepository } from "../lotes/lotes-repository";

export class UploadCsvService {
  constructor(
    private boletoRepo = new BoletoRepository(),
    private loteRepo = new LoteRepository()
  ) { }

  async execute(filePath: string): Promise<void> {
    const results: ICsvSchema[] = [];

    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv({ separator: ';' }))
        .on('data', (data) => {
          results.push({
            nome: data.nome,
            unidade: data.unidade,
            valor: Number(data.valor),
            linha_digitavel: data.linha_digitavel,
          });
        })

        .on('end', async () => {
          try {

            const unidadesUnicas = [
              ...new Set(results.map(r => r.unidade.padStart(4, '0')))
            ];

            const lotes = await this.loteRepo.findByUnidades(unidadesUnicas);

            const loteMap = new Map<string, number>();
            lotes.forEach(l => {
              loteMap.set(l.nome, l.id);
            });

            const boletos = results.map((r) => {
              const unidadeFormatada = r.unidade.padStart(4, '0');
              const idLote = loteMap.get(unidadeFormatada);

              if (!idLote) throw new Error(`Lote não encontrado para unidade: ${r.unidade}`);

              return {
                nomeSacado: r.nome,
                idLote,
                valor: r.valor,
                linhaDigitavel: r.linha_digitavel,
              };
            });

            await this.boletoRepo.createMany(boletos);
            resolve();
          } catch (err) {
            reject(err);
          }
        })
        .on('error', (err) => {
          reject(err);
        });
    });
  }
}
