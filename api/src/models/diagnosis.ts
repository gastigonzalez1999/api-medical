import mongoose, { Schema, model } from 'mongoose';

export interface IDiagnosis {
  userId: mongoose.Schema.Types.ObjectId;
  symptoms: string[];
  diagnosis: string;
  confirmed: boolean;
}

const DiagnosisSchema: Schema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  symptoms: [String],
  diagnosis: String,
  confirmed: { type: Boolean, default: false }
});

const Diagnosis = model<IDiagnosis>('Diagnosis', DiagnosisSchema);
export default Diagnosis;