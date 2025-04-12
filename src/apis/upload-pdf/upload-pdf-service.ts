import fs from "fs";
import path from "path";
import { PDFDocument } from "pdf-lib";
import { BoletoRepository } from "../boletos/boletos-repository";

export class UploadPdfService {

  async splitPdf(filePath: string): Promise<void> {

    const boletoRepository = new BoletoRepository()
    const boletos = await boletoRepository.findAllOrdered();

    const pdfBytes = fs.readFileSync(filePath);
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const totalPages = pdfDoc.getPageCount();

    if (totalPages !== boletos.length) {
      throw new Error("Número de páginas não corresponde à quantidade de boletos.");
    }

    const outputDir = path.resolve(__dirname, "..", "..", "..", "boletos_divididos");
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }

    for (let i = 0; i < boletos.length; i++) {
      const boleto = boletos[i];

      const newPdf = await PDFDocument.create();
      const [copiedPage] = await newPdf.copyPages(pdfDoc, [i]);
      newPdf.addPage(copiedPage);

      const newBytes = await newPdf.save();
      const outputPath = path.join(outputDir, `${boleto.id}.pdf`);
      fs.writeFileSync(outputPath, newBytes);
    }
  }
}
