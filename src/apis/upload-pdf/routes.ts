import { upload } from "@/config/multer-config";
import { request, response, Router } from "express";
import { UploadPdfController } from "./upload-pdf-controller";

const router = Router();
const controller = new UploadPdfController();


router.post('/upload/pdf',  upload.single('pdf'), (request, response) => controller.upload(request, response));

export {router as uploadPdfRouter};