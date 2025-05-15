import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Date, Decimal128, Document } from 'mongoose';

@Schema({ timestamps: true })
export class Products extends Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  content: string;

  @Prop({ unique: true, type: mongoose.Schema.Types.String })
  slug: string;

  @Prop({ unique: true, type: mongoose.Schema.Types.Number })
  quantity: string;

  @Prop({ type: mongoose.Schema.Types.Decimal128 })
  price: Decimal128;

  @Prop({ type: mongoose.Schema.Types.String })
  description: string;

  @Prop({ type: Date })
  updated_at: Date;

  @Prop({ default: false })
  is_deleted: boolean;
}

export const ProductsSchema = SchemaFactory.createForClass(Products);
export type ProductsDocument = Products & Document;
