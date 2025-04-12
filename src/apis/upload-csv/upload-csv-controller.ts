import { Request, Response } from "express";
import { UploadCsvService } from "./upload-csv-service";

export class UploadCsvController {

    async upload(request: Request, response: Response): Promise<void> {

        const file = request.file
        const service = new UploadCsvService();

        if (!file) {
            response.status(400).json({ error: "Arquivo não enviado" });
            return;
        };


        try {
            await service.execute(file.path);

            response.status(200).json({
                message: "Arquivo recebido com sucesso",
                file: file.originalname
            });
        } catch (error: any) {
            console.error("Erro ao importar CSV:", error);

            const statusCode = error.statusCode || 404;
            const message = error.message || "Erro ao importar arquivo";

            response.status(statusCode).json({ error: message });
        }
    }

}
