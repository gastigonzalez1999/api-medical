import { Router } from 'express';
import SymptomsController from '../symptoms/symptoms.controller';

const router: Router = Router();
const symptomsController = new SymptomsController();

router.get('/', symptomsController.getSymptoms);