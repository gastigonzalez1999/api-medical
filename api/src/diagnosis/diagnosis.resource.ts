import { Request, Response } from "express";
import Diagnosis from "../models/diagnosis";

export default class DiagnosisResource {
  public createDiagnosis = async (req: Request, res: Response) => {
    const { symptoms, diagnosis, user } = req.body;
    try {
      const newDiagnosis = new Diagnosis({
        userId: user._id, // Assuming you have middleware to authenticate the user and store it in req.user
        symptoms,
        diagnosis,
      });
  
      await newDiagnosis.save();
  
      res.status(201).json({
        message: 'Diagnosis created successfully',
        newDiagnosis,
      });
  
    } catch (error) {
      console.error('Diagnosis creation error:', error);
      res.status(500).json({ error: 'Failed to create diagnosis' });
    }
  };
}
