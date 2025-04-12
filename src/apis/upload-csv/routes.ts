import { upload } from "@/config/multer-config";
import { Router } from "express";
import { UploadCsvController } from "./upload-csv-controller";

const router = Router();
const controller = new UploadCsvController();

router.post('/upload', upload.single("file"), (request, response) => controller.upload(request, response));

export { router as uploadCsvRoute };