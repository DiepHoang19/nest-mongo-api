// user.schema.ts
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop()
  full_name: string;

  @Prop()
  password: string;

  @Prop()
  email: string;

  @Prop()
  phone_number: string;

  @Prop()
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = User & Document;
