import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser {
  name: string;
  surname: string;
  birthday: Date;
  cf: string;
  email: string;
  address: string;
  zipCode: number;
  city: string;
  role: Schema.Types.ObjectId;
  password: string;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  birthday: { type: Date, required: true },
  cf: { type: String, required: true, lowercase: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  address: { type: String, required: true },
  zipCode: { type: Number, required: true },
  city: { type: String, required: true },
  role: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Role',
  },
  password: { type: String, required: true },
});

const saltRounds = 8;
UserSchema.pre('save', async next => {
  // @ts-ignore
  if (this.isModified('passwordHash')) {
    // @ts-ignore
    this.passwordHash = await bcrypt.hash(this.passwordHash, saltRounds);
  }
  next();
});

export default mongoose.model('User', UserSchema);
