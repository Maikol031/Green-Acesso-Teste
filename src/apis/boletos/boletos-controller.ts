import { Request, Response } from "express";
import { BoletoService } from "./boletos-service";

export class BoletosController {


  async getBoletos(request: Request, response: Response) {
    const boletoService = new BoletoService();

    try {
      const filters = request.query;

      const boletos = await boletoService.getBoletos(filters);

      if (filters.relatorio === '1') {
        const base64PDF = await boletoService.generatePDF(boletos);
        response.json({ base64: base64PDF });
        return;
      }

      response.status(200).json(boletos);
    } catch (error) {
      response.status(500).send({ message: 'Erro ao buscar boletos', error });
    }
  }


}