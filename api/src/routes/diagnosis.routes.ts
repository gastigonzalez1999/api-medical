import { Router } from 'express';
import { check } from 'express-validator';
import { validateFields } from '../middlewares/validation';
import DiagnosisController from '../diagnosis/diagnosis.controller';

const router: Router = Router();
const diagnosisController = new DiagnosisController();

router.post('/',
    [
        check('symptoms', 'The symptoms are required').not().isEmpty(),
        check('diagnosis', 'The diagnosis is required').not().isEmpty(),
        validateFields,
    ], diagnosisController.createDiagnosis);