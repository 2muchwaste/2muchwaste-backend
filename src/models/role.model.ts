import mongoose, { Schema } from 'mongoose';
import { Roles } from '../enums/Roles';

export interface IRole {
  name: string;
}

const RoleSchema = new Schema<IRole>({
  name: {
    type: String,
    required: true,
    default: Roles.CUSTOMER,
    enum: Object.values(Roles),
  },
});

export default mongoose.model('Role', RoleSchema);
