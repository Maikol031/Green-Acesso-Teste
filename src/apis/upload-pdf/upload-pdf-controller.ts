import { Request, Response } from "express";
import { UploadPdfService } from "./upload-pdf-service";

export class UploadPdfController {
  async upload(request: Request, response: Response): Promise<void> {
    try {
      const file = request.file;

      if (!file) {
        response.status(400).json({ message: "Nenhum arquivo enviado." });
        return;
      }

      const service = new UploadPdfService();

      const result = await service.splitPdf(file.path);

        response.status(200).json({ message: "PDF salvo com sucesso!", path: result });
    } catch (error) {
      console.error("Erro ao salvar PDF:", error);
       response.status(500).json({ message: "Erro ao salvar o PDF." });
    }
  }
}
