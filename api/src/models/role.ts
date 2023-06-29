import { Schema, model } from 'mongoose';

export interface IRole {
  role: string;
}

const RoleSchema: Schema = new Schema({
  role: {
    type: String,
    required: [true, 'The role is required']
  }
});

const Role = model<IRole>('Role', RoleSchema);
export default Role;