// user.schema.ts
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  full_name: string;

  @Prop()
  password: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  phone_number: string;

  @Prop()
  role: string;

  @Prop({ default: false })
  is_deleted: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = User & Document;
