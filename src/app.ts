import express from 'express';
import { uploadCsvRoute, uploadPdfRouter, boletoRouter } from './routes';


const app = express();

app.use(express.json());
app.use('/api', uploadCsvRoute, uploadPdfRouter, boletoRouter);

export default app;