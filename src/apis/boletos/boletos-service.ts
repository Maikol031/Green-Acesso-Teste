import { BoletoRepository } from "./boletos-repository";
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

export class BoletoService {
    private boletoRepo = new BoletoRepository();

    async getBoletos(filters: any) {
        return await this.boletoRepo.findAll(filters);
    }

    async generatePDF(boletos: any[]) {
        const doc = new PDFDocument();


        const pastaRelatorios = path.resolve(__dirname, '..', '..', '..', 'relatorios');

        if (!fs.existsSync(pastaRelatorios)) {
            fs.mkdirSync(pastaRelatorios, { recursive: true });
        }
        const filePath = path.resolve(pastaRelatorios, 'boleto_relatorio.pdf');

        const writeStream = fs.createWriteStream(filePath);

        doc.pipe(writeStream);

        doc.text("Relatório de Boletos", { align: 'center' });
        doc.moveDown();

        doc.text('ID  | Nome Sacado | Id Lote | Valor  | Linha Digitavel', {
            width: 500,
            align: 'left',
        });

        boletos.forEach((boleto) => {
            doc.text(
                `${boleto.id} | ${boleto.nomeSacado} | ${boleto.idLote} | ${boleto.valor} | ${boleto.linhaDigitavel}`,
                { width: 500, align: 'left' }
            );
        });

        doc.end();

        return new Promise<string>((resolve, reject) => {
            writeStream.on('finish', () => {
                fs.readFile(filePath, { encoding: 'base64' }, (err, data) => {
                    if (err) reject(err);
                    resolve(data);
                });
            });
        });
    }
}
