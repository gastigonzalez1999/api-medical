import { Request, Response } from 'express';
import DiagnosisResource from './diagnosis.resource';

export default class DiagnosisController {
  diagnosisResource: DiagnosisResource;
  constructor() {
    this.diagnosisResource = new DiagnosisResource();
  }

  public createDiagnosis = async (req: Request, res: Response) => {
    return this.diagnosisResource.createDiagnosis(req, res);
  };
}
