import { Router } from "express";
import { BoletosController } from "./boletos-controller";

const router = Router();
const controller = new BoletosController();

router.get("/boletos", (request, response) => controller.getBoletos(request, response));

export {router as boletoRouter}